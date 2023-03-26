import { z } from "zod";
import { privateProcedure, adminProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ExamType, type Option } from "@prisma/client";
import { getUserId } from "~/server/api/services/authService";
import {
  checkExamStatus,
  getAllExamQuestionsStatus,
  getExamByUserId,
  getExamQuestionByIndex,
  getShuffledOptions,
  getTimeRemaining,
} from "~/server/api/services/examService";

export const getExamQuestion = privateProcedure
  .input(z.object({ index: z.number(), examType: z.nativeEnum(ExamType) }))
  .query(async ({ ctx, input }) => {
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const { examType } = input;
    const exam = await getExamByUserId(userId, examType, ctx.prisma);

    // check exam status
    await checkExamStatus(exam);

    // get exam question
    const examQuestion = await getExamQuestionByIndex(
      exam.id,
      input.index,
      ctx.prisma
    );

    // get options
    const options = await getShuffledOptions(
      examQuestion.questionID,
      examQuestion.optionOrder,
      ctx.prisma
    );

    return {
      id: examQuestion.id,
      image: examQuestion.question.image,
      isFlagged: examQuestion.isFlagged,
      index: examQuestion.order,
      question: examQuestion.question.question,
      options: options,
      answer: examQuestion.answerID,
      timeRemaining: getTimeRemaining(exam),
    };
  });

export const getExamQuestionStatus = privateProcedure
  .input(z.object({ examType: z.nativeEnum(ExamType) }))
  .query(async ({ ctx, input }) => {
    // get user id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const { examType } = input;
    const exam = await getExamByUserId(userId, examType, ctx.prisma);

    // check exam status
    await checkExamStatus(exam);

    // get all exam questions status
    const examQuestionsStatus = await getAllExamQuestionsStatus(
      exam.id,
      ctx.prisma
    );

    return {
      examQuestionsStatus: examQuestionsStatus,
      timeRemaining: getTimeRemaining(exam),
    };
  });

// TODO: dev only, delete later
export const getWarmUpExamQuestions = adminProcedure.query(async ({ ctx }) => {
  const userId = await getUserId(ctx.tokenData, ctx.prisma);

  // get warm up questions
  const questions = await ctx.prisma.examQuestion.findMany({
    where: {
      exam: {
        type: ExamType.WARM_UP,
        AND: {
          userID: userId,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
    include: {
      question: true,
    },
  });

  const optionsMap = new Map<string, Option[]>();
  // shuffle options
  for (const question of questions) {
    const optionOrder = question.optionOrder;
    console.log(optionOrder);

    const options = await ctx.prisma.option.findMany({
      where: {
        questionID: question.question.id,
      },
    });

    if (options.length === 0)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get options!",
      });

    const shuffledOptions = optionOrder.map((order) => options[order]);

    optionsMap.set(question.id, shuffledOptions as Option[]);
  }

  if (!questions)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get questions!",
    });

  return {
    questions,
    optionsMap,
  };
});
