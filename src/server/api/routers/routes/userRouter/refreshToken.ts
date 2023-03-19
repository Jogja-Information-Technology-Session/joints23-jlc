import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

import { publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const refreshToken = publicProcedure.mutation(async ({ ctx }) => {
  try {
    const { cookies } = ctx;

    if (!("jid" in cookies)) throw new TRPCError({ code: "FORBIDDEN" });
    const { jid } = cookies;

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
    console.log("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
});
