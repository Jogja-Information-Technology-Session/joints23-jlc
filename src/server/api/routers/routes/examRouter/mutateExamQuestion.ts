import { z } from "zod";
import { privateProcedure } from "~/server/api/trpc";

import { ExamType } from "@prisma/client";
import { getUserId } from "~/server/api/services/authService";
import {
  checkExamStatus,
  getExamByUserId,
  getExamQuestionByIndex,
} from "~/server/api/services/examService";
import { TRPCError } from "@trpc/server";

export const setAnswer = privateProcedure
  .input(
    z.object({
      examQuestionId: z.string().length(24),
      examType: z.nativeEnum(ExamType),
      index: z.number(),
      optionId: z.string().length(24).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // check if option input is valid
    const option = await ctx.prisma.option.findUnique({
      where: {
        id: input.optionId,
      },
    });
    if (!option)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid option" });

    // get user id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const exam = await getExamByUserId(userId, input.examType, ctx.prisma);

    // check exam status
    checkExamStatus(exam);

    // get exam question
    const examQuestion = await getExamQuestionByIndex(
      exam.id,
      input.index,
      ctx.prisma
    );

    // set answer
    const updatedExamQuestion = await ctx.prisma.examQuestion.update({
      where: {
        id: examQuestion.id,
      },
      data: {
        answerID: input.optionId,
      },
    });

    return {
      index: updatedExamQuestion.order,
      answer: updatedExamQuestion.answerID,
    };
  });

export const clearAnswer = privateProcedure
  .input(
    z.object({
      examQuestionId: z.string().length(24),
      examType: z.nativeEnum(ExamType),
      index: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // get user id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const exam = await getExamByUserId(userId, input.examType, ctx.prisma);

    // check exam status
    checkExamStatus(exam);

    // get exam question
    const examQuestion = await getExamQuestionByIndex(
      exam.id,
      input.index,
      ctx.prisma
    );

    // set answer
    const updatedExamQuestion = await ctx.prisma.examQuestion.update({
      where: {
        id: examQuestion.id,
      },
      data: {
        answerID: null,
      },
    });

    return {
      index: updatedExamQuestion.order,
      answer: updatedExamQuestion.answerID,
    };
  });

export const toggleFlagQuestion = privateProcedure
  .input(
    z.object({
      examQuestionId: z.string().length(24),
      examType: z.nativeEnum(ExamType),
      index: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // get user id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const exam = await getExamByUserId(userId, input.examType, ctx.prisma);

    // check exam status
    checkExamStatus(exam);

    // get exam question
    const examQuestion = await getExamQuestionByIndex(
      exam.id,
      input.index,
      ctx.prisma
    );

    // toggle flag
    const updatedExamQuestion = await ctx.prisma.examQuestion.update({
      where: {
        id: examQuestion.id,
      },
      data: {
        isFlagged: !examQuestion.isFlagged,
      },
    });

    return {
      index: updatedExamQuestion.order,
      isFlagged: updatedExamQuestion.isFlagged,
    };
  });
