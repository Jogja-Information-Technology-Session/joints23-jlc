import { ExamType } from "@prisma/client";
import {z} from "zod";
import { addNewQuestion } from "~/server/api/services/cmsService";
import { adminProcedure } from "~/server/api/trpc";

export const addQuestion = adminProcedure.input(
    z.object({
        question: z.string(),
        image: z.string().nullable(),
        type: z.nativeEnum(ExamType),
        options: z.array(
            z.object({
                prompt: z.string(),
                isCorrect: z.boolean(),
            })
        ),
    })
).mutation(async ({ctx, input}) => {
    return await addNewQuestion(input, ctx.prisma);
})