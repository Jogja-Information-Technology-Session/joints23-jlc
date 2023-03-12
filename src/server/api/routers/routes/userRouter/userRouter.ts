import { z } from "zod";
import bcrypt from "bcrypt";

import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

import { login } from "./login";
import { logout } from "./logout";
import { refreshToken } from "./refreshToken";

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
  login,
  logout,
  refreshToken,
});
