import { ExamStatus, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function createExam(prisma: PrismaClient, userId: string) {
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
  }

  // get all question
  const questions = await prisma.question.findMany();

  // create empty exam
  const exam = await prisma.exam.create({
    data: {
      userID: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      status: ExamStatus.NOT_STARTED,
    },
  });

  // create examquestions
  await prisma.examQuestion.createMany({
    data: questions.map((question) => ({
      examID: exam.id,
      questionID: question.id,
    })),
  });
}

export async function getExamQuestions(prisma: PrismaClient, userId: string) {
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
  }

  // get all question
  const questions = await prisma.examQuestion.findMany({
    where: {
      exam: {
        userID: userId,
      },
    },
    include: {
      question: true,
    },
  });

  return questions;
}
