import { z } from "zod";
import { privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ExamType, ExamStatus, type Question } from "@prisma/client";
import { getUserId } from "~/server/api/services/authService";

export const createExam = privateProcedure
  .input(
    z.object({
      examType: z.nativeEnum(ExamType),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // get user Id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // check if user already has the exam
    const duplicateExam = await ctx.prisma.exam.findFirst({
      where: {
        userID: userId,
        type: input.examType,
      },
    });

    if (duplicateExam)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You already have this exam!",
      });

    // create exam
    const exam = await ctx.prisma.exam.create({
      data: {
        type: input.examType,
        startTime: new Date(),
        endTime: new Date(),
        status: ExamStatus.NOT_STARTED,
        userID: userId,
      },
    });

    // get warm up questions
    const questions = await ctx.prisma.question.findMany({
      where: {
        type: input.examType,
      },
    });

    if (!questions || questions.length === 0)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get questions!",
      });

    // shuffle questions
    const shuffledQuestions = shuffleArray<Question>(questions);

    // create exam questions
    const examQuestions = await ctx.prisma.examQuestion.createMany({
      data: shuffledQuestions.map((question, index) => ({
        order: index,
        examID: exam.id,
        questionID: question.id,
        optionOrder: shuffleArray<number>([0, 1, 2, 3, 4]),
      })),
    });

    if (!examQuestions)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create exam questions!",
      });

    return exam;
  });

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArray[i] as T;
    shuffledArray[i] = shuffledArray[j] as T;
    shuffledArray[j] = temp;
  }
  return shuffledArray.filter((item): item is T => typeof item !== "undefined");
}
