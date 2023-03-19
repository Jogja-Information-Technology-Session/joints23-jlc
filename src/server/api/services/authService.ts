import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type JwtPayload } from "jsonwebtoken";

export async function getUserId(
  tokenData: JwtPayload | null,
  prisma: PrismaClient
) {
  if (!tokenData)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  const { userId } = tokenData;

  if (typeof userId !== "string") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found!",
    });
  }

  return userId;
}
