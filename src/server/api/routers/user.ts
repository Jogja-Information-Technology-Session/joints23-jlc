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
        username: z.string(),
        password: z.string(),
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
      // TODO: validate username and password

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
          env.JWT_ACCESSTOKEN_SECRET
        ) || "";

      const refreshToken =
        jwt.sign(
          {
            userId: user.id,
            username: user.username,
            role: user.role,
            tokenVersion: user.tokenVersion,
          },
          env.JWT_REFRESHTOKEN_SECRET
        ) || "";
      ctx.res.setHeader("Set-Cookie", [
        `jid=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
      ]);

      return accessToken;
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.setHeader("Set-Cookie", [`jid=; HttpOnly; Path=/; Max-Age=0`]);

    return "Logout successful!";
    // TODO
  }),
  refreshToken: privateProcedure.mutation(async ({ ctx }) => {
    // TODO: verify refreshToken and return new accessToken
    if (!ctx.tokenData || typeof ctx.tokenData === "string") return null;

    const { userId, tokenVersion } = ctx.tokenData;

    // TODO: extend jwt type
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
        env.JWT_ACCESSTOKEN_SECRET
      ) || "";

    return accessToken;
  }),
});
