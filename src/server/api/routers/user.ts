import { z } from "zod";
import bcrypt from "bcrypt";
import { env } from "../../../env.mjs";
import jwt from "jsonwebtoken";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createExam } from "../services/exams_service";

export const userRouter = createTRPCRouter({
  createUser: adminProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(6).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const { username, password } = input;
      // TODO env salt
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });

      await createExam(ctx.prisma, user.id);
      return user;
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      const accessToken =
        jwt.sign(
          { userId: user.id, username: user.username, role: user.role },
          env.JWT_ACCESSTOKEN_SECRET,
          { expiresIn: "15m" }
        ) || "";

      const refreshToken =
        jwt.sign(
          {
            userId: user.id,
            username: user.username,
            role: user.role,
            tokenVersion: user.tokenVersion,
          },
          env.JWT_REFRESHTOKEN_SECRET,
          // TODO: adjust age
          { expiresIn: "1d" }
        ) || "";
      ctx.res.setHeader("Set-Cookie", [
        `jid=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 1}`,
      ]);

      return accessToken;
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.setHeader("Set-Cookie", [`jid=; HttpOnly; Path=/; Max-Age=0`]);
    // TODO: invalidate token

    return "Logout successful!";
  }),
  refreshToken: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const { cookies } = ctx;

      if (!("jid" in cookies)) throw new TRPCError({ code: "FORBIDDEN" });
      const { jid } = cookies;

      // if (!jid) throw new TRPCError({ code: "FORBIDDEN" })

      const payload = jwt.verify(jid, env.JWT_REFRESHTOKEN_SECRET);

      if (!payload || typeof payload === "string")
        throw new TRPCError({ code: "FORBIDDEN" });

      const { userId, tokenVersion } = payload;

      if (typeof userId !== "string")
        throw new TRPCError({ code: "FORBIDDEN" });

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) return null;

      if (user.tokenVersion !== tokenVersion)
        throw new TRPCError({ code: "FORBIDDEN" });

      const accessToken =
        jwt.sign(
          { userId: user.id, username: user.username, role: user.role },
          env.JWT_ACCESSTOKEN_SECRET,
          { expiresIn: "15m" }
        ) || "";
      console.log("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      throw new TRPCError({ code: "FORBIDDEN" });
      // return null;
    }
  }),
});
