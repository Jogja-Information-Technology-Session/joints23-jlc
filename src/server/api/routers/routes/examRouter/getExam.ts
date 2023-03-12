import { privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ExamType, type Option } from "@prisma/client";

// TODO: dev only, delete later
export const getWarmUpExamQuestions = privateProcedure.query(
  async ({ ctx }) => {
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
