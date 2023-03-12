import { publicProcedure } from "~/server/api/trpc";

export const logout = publicProcedure.mutation(({ ctx }) => {
  ctx.res.setHeader("Set-Cookie", [`jid=; HttpOnly; Path=/; Max-Age=0`]);
  // TODO: invalidate token

  return "Logout successful!";
});
