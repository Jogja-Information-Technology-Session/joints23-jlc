import { type Question, type Exam, type PrismaClient } from "@prisma/client";
import { type IAddQuestionOptions, type IAddQuestion } from "../entities/add-question.entity";

export async function getAllExams(prisma: PrismaClient): Promise<Exam[]> {
    const exams = await prisma.exam.findMany(
        {
            select: {
                id: true,
                type: true,
                status: true,
                startTime: true,
                endTime: true,
                score: true,
                userID: true,
                user: {
                  select: {
                    id: true,
                    username: true
                  }
                },
              }
        }
    );

    return exams;
}

export async function addNewQuestion( question: IAddQuestion ,prisma: PrismaClient): Promise<Question> {
    const optionsData: IAddQuestionOptions[] = question.options.map((option) => ({
        prompt: option.prompt,
        isCorrect: option.isCorrect,
      }));

    const result: Question = await prisma.question.create({
        data: {
            question: question.question,
            image: question.image,
            type: question.type,
            Option: {
                create: optionsData
            }
        }
    });
    
    return result;
}
