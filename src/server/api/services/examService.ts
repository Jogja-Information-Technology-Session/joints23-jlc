import {
  type ExamType,
  type PrismaClient,
  type Option,
  ExamStatus,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function getExamByUserId(
  userId: string,
  examType: ExamType,
  prisma: PrismaClient
) {
  const exams = await prisma.exam.findMany({
    where: {
      userID: userId,
      type: examType,
    },
  });

  if (!exams || exams.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get exam!",
    });

  const exam = exams[0];

  if (!exam)
    throw new TRPCError({ code: "NOT_FOUND", message: "Exam not found!" });

  return exam;
}

export async function getExamQuestionByIndex(
  examId: string,
  index: number,
  prisma: PrismaClient
) {
  const examQuestions = await prisma.examQuestion.findMany({
    where: {
      examID: examId,
      order: index,
    },
    include: {
      question: true,
    },
  });

  if (!examQuestions || examQuestions.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get exam questions!",
    });

  const examQuestion = examQuestions[0];

  if (!examQuestion)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Exam question not found!",
    });

  return examQuestion;
}

export async function getAllExamQuestionsStatus(
  examId: string,
  prisma: PrismaClient
) {
  const examQuestions = await prisma.examQuestion.findMany({
    where: {
      examID: examId,
    },
  });

  if (!examQuestions || examQuestions.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get exam questions!",
    });

  const examQuestionsStatus = examQuestions.map((examQuestion) => {
    return {
      index: examQuestion.order,
      isAnswered: examQuestion.answerID ? true : false,
      isFlagged: examQuestion.isFlagged,
    };
  });

  return examQuestionsStatus;
}

export async function getShuffledOptions(
  questionId: string,
  optionOrder: number[],
  prisma: PrismaClient
) {
  const options = await prisma.option.findMany({
    where: {
      questionID: questionId,
    },
  });

  if (!options || options.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get options!",
    });

  // shuffle options
  const shuffledOptions = optionOrder.map((order) => {
    if (!options[order]) {
      return;
    }
    const { id, prompt } = options[order] as Option;
    return { id, prompt };
  });

  return shuffledOptions;
}

export function checkExamStatus(status: ExamStatus) {
  if (status === ExamStatus.SUBMITTED)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Exam already submitted!",
    });
}
