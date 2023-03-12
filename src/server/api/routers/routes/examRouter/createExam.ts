import { privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ExamType, ExamStatus } from "@prisma/client";

export const createWarmUpExam = privateProcedure.mutation(async ({ ctx }) => {
  if (!ctx.tokenData)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  const { userId } = ctx.tokenData;

  if (typeof userId !== "string") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  }

  const user = await ctx.prisma.user.findUnique({
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

  // create exam
  const exam = await ctx.prisma.exam.create({
    data: {
      type: ExamType.WARM_UP,
      startTime: new Date(),
      endTime: new Date(),
      status: ExamStatus.NOT_STARTED,
      userID: userId,
    },
  });

  // get warm up questions
  const questions = await ctx.prisma.question.findMany({
    where: {
      type: ExamType.WARM_UP,
    },
  });

  if (!questions || questions.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get questions!",
    });

  // TODO: shuffle questions
  // Shuffle questions

  // TODO: add options order
  // create exam questions
  const examQuestions = await ctx.prisma.examQuestion.createMany({
    data: questions.map((question, index) => ({
      order: index,
      examID: exam.id,
      questionID: question.id,
    })),
  });

  if (!examQuestions)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create exam questions!",
    });
  return;
});

export const createExam = privateProcedure.mutation(async ({ ctx }) => {
  if (!ctx.tokenData)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  const { userId } = ctx.tokenData;

  if (typeof userId !== "string") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized!",
    });
  }

  const user = await ctx.prisma.user.findUnique({
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

  //   create exam
});
