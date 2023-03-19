import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

import { publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const login = publicProcedure
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
      throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
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

    return {
      accessToken: accessToken,
      username: user.username,
    };
  });
