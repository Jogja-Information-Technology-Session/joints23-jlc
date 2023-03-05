import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

import { Answer } from "@prisma/client";

export const questionRouter = createTRPCRouter({
  createQuestion: adminProcedure
    .input(
      z.object({
        questionPrompt: z.string(),
        correctAnswer: z.nativeEnum(Answer),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { questionPrompt, correctAnswer } = input;

      const question = await ctx.prisma.question.create({
        data: {
          question: questionPrompt,
          A: "A adsfadsf?",
          B: "B adsfadsf?",
          C: "C adsfadsf?",
          D: "D adsfadsf?",
          correctAnswer: correctAnswer,
        },
      });
      return question;
    }),
});
