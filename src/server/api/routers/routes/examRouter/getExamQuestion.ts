import { z } from "zod";
import { privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ExamType, type Option } from "@prisma/client";
import { getUserId } from "~/server/api/services/authService";
import {
  checkExamStatus,
  getExamByUserId,
  getExamQuestionByIndex,
  getShuffledOptions,
} from "~/server/api/services/examService";

export const getWarmUpQuestion = privateProcedure
  .input(z.object({ index: z.number() }))
  .query(async ({ ctx, input }) => {
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const exam = await getExamByUserId(userId, ExamType.WARM_UP, ctx.prisma);

    // check exam status
    checkExamStatus(exam.status);

    // get exam question
    const examQuestion = await getExamQuestionByIndex(
      exam.id,
      input.index,
      ctx.prisma
    );

    // get options
    const options = await getShuffledOptions(
      examQuestion.id,
      examQuestion.optionOrder,
      ctx.prisma
    );

    return {
      question: examQuestion.question.question,
      options: options,
      answer: examQuestion.answerID,
    };
  });

// TODO: dev only, delete later
export const getWarmUpExamQuestions = privateProcedure.query(
  async ({ ctx }) => {
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
  }
);
