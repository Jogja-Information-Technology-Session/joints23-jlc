import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const examRouter = createTRPCRouter({
  getQuestions: privateProcedure.query(async ({ ctx }) => {
    const questions = await ctx.prisma.examQuestion.findMany();
    return questions;
  }),
});
