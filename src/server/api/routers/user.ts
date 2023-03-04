import { z } from "zod";
import bcrypt from "bcrypt";
import { env } from "../../../env.mjs";
import jwt from "jsonwebtoken";

import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
    // if (!ctx.tokenData || typeof ctx.tokenData === "string") return null;
    const { cookies } = ctx;

    const { jid } = cookies;

    if (!jid) return null;

    const payload = jwt.verify(jid, env.JWT_REFRESHTOKEN_SECRET);

    if (!payload || typeof payload === "string") return null;

    const { userId, tokenVersion } = payload;

    if (typeof userId !== "string") return null;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    if (user.tokenVersion !== tokenVersion) return null;

    const accessToken =
      jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        env.JWT_ACCESSTOKEN_SECRET,
        { expiresIn: "15m" }
      ) || "";
    console.log("accessToken", accessToken);
    return accessToken;
  }),
});
