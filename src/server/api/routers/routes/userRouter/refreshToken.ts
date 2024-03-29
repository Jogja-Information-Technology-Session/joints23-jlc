import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

import { publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const refreshToken = publicProcedure.mutation(async ({ ctx }) => {
  try {
    const { cookies } = ctx;
    const { jid } = cookies;

    if (!jid) throw new TRPCError({ code: "FORBIDDEN" });

    const payload = jwt.verify(jid, env.JWT_REFRESHTOKEN_SECRET);

    if (!payload || typeof payload === "string")
      throw new TRPCError({ code: "FORBIDDEN" });

    const { userId, tokenVersion } = payload;

    if (typeof userId !== "string") throw new TRPCError({ code: "FORBIDDEN" });

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

    return {
      accessToken: accessToken,
      username: user.username,
    };
  } catch (error) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
});
