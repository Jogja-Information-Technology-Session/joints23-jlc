import { z } from "zod";
import { privateProcedure } from "~/server/api/trpc";

import { ExamType } from "@prisma/client";
import { getUserId } from "~/server/api/services/authService";
import {
  getExamByUserId,
  getTimeRemaining,
} from "~/server/api/services/examService";

export const getExamStatus = privateProcedure
  .input(z.object({ examType: z.nativeEnum(ExamType) }))
  .query(async ({ ctx, input }) => {
    // get user id
    const userId = await getUserId(ctx.tokenData, ctx.prisma);

    // find exam by user id and type
    const { examType } = input;
    const exam = await getExamByUserId(userId, examType, ctx.prisma);

    return {
      startsAt: exam.startTime,
      status: exam.status,
      timeRemaining: getTimeRemaining(exam),
    };
  });
