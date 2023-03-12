import { type ExamType } from "@prisma/client";

import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const questionRouter = createTRPCRouter({
  inputQuestion: adminProcedure.mutation(async ({ ctx }) => {
    for (let i = 0; i < questionData.length; i++) {
      // create question
      const q = questionData[i];
      if (!q)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Question data is empty",
        });

      const question = await ctx.prisma.question.create({
        data: {
          question: q.questionPrompt,
          type: q.type as ExamType,
          image: q.image,
        },
      });

      // create options
      const options = [
        {
          prompt: q.option1,
          isCorrect: q.correctAnswer === "option1",
          questionID: question.id,
        },
        {
          prompt: q.option2,
          isCorrect: q.correctAnswer === "option2",
          questionID: question.id,
        },
        {
          prompt: q.option3,
          isCorrect: q.correctAnswer === "option3",
          questionID: question.id,
        },
        {
          prompt: q.option4,
          isCorrect: q.correctAnswer === "option4",
          questionID: question.id,
        },
        {
          prompt: q.option5,
          isCorrect: q.correctAnswer === "option5",
          questionID: question.id,
        },
      ];

      await ctx.prisma.option.createMany({
        data: options,
      });
    }

    return;
  }),
  getAll: adminProcedure.query(async ({ ctx }) => {
    const questions = await ctx.prisma.question.findMany({
      include: {
        Option: {
          select: {
            id: true,
            prompt: true,
            isCorrect: true,
          },
        },
      },
    });

    return questions;
  }),
});

const questionData = [
  {
    questionPrompt: "the apple is red",
    type: "WARM_UP",
    image:
      "https://drive.google.com/uc?export=view&id=1rH8GNTqmxpqYqWY-6h4zAIrQADi1SOwO",
    option1: "no it is not",
    option2: "yes it is not",
    option3: "no it is yes",
    option4: "yes it is yes",
    option5: "none of the above",
    correctAnswer: "option1",
  },
  {
    questionPrompt: "the apple is red",
    type: "WARM_UP",
    image: "",
    option1: "no it is not",
    option2: "yes it is not",
    option3: "no it is yes",
    option4: "yes it is yes",
    option5: "none of the above",
    correctAnswer: "option2",
  },
];
