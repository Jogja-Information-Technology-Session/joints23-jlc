import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getExamQuestions } from "../services/exams_service";

export const examRouter = createTRPCRouter({
  getQuestions: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.tokenData) return null;
    const { userId } = ctx.tokenData;
    if (typeof userId !== "string") return null;

    const questions = await getExamQuestions(ctx.prisma, userId);

    return questions;
  }),

  getQuestion: privateProcedure
    .input(
      z.object({
        index: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.tokenData) return null;

      const { userId } = ctx.tokenData;
      if (typeof userId !== "string") return null;

      const exam = await ctx.prisma.exam.findUnique({
        where: {
          userID: userId,
        },
        select: {
          ExamQuestion: {
            skip: input.index,
            take: 1,
          },
        },
      });
      if (!exam) return null;

      // const question = await ctx.prisma.examQuestion.findUnique({
      //   where: {
      //     examID: exam.id,
      //   },
      // });
      console.log(exam);
      return exam;
    }),
});
