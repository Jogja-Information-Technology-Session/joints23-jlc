import {
  type ExamType,
  PrismaClient,
  type Option,
  ExamStatus,
  type Exam,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();

export async function gradeExam(exam: Exam, prisma: PrismaClient) {
  // get exam questions
  const examQuestions = await prisma.examQuestion.findMany({
    where: {
      examID: exam.id,
    },
  });

  if (!examQuestions || examQuestions.length === 0)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get exam questions!",
    });

  // grade exam
  let score = 0;
  // for each exam question get the option and check if it is correct
  for (const examQuestion of examQuestions) {
    const optionId = examQuestion.answerID;

    if (!optionId) {
      // 0 points for unanswered questions
      continue;
    }

    const option = await prisma.option.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!option)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get option!",
      });

    if (option.isCorrect) {
      // 4 points for correct answer
      score += 4;
    } else {
      // -1 point for incorrect answer
      score -= 1;
    }
  }

  const gradedExam = await prisma.exam.update({
    where: {
      id: exam.id,
    },
    data: {
      score: score,
      status: ExamStatus.GRADED,
    },
  });

  if (!gradedExam)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to grade exam!",
    });

  return gradedExam;
}

export async function getExamByUserId(
  userId: string,
  examType: ExamType,
  prisma: PrismaClient
) {
  const exam = await prisma.exam.findFirst({
    where: {
      userID: userId,
      type: examType,
    },
  });

  if (!exam)
    throw new TRPCError({ code: "NOT_FOUND", message: "Exam not found!" });

  return exam;
}

export async function getExamQuestionByIndex(
  examId: string,
  index: number,
  prisma: PrismaClient
) {
  const examQuestion = await prisma.examQuestion.findFirst({
    where: {
      examID: examId,
      order: index,
    },
    include: {
      question: true,
    },
  });

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

export async function checkExamStatus(exam: Exam) {
  if (exam.status === ExamStatus.SUBMITTED)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Exam already submitted!",
    });

  const currentTime = new Date().getTime();

  // Check if current time is greater than start time
  if (currentTime < exam.startTime.getTime())
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Exam has not started yet!",
    });

  // Check if current time is less than end time
  if (currentTime > exam.endTime.getTime())
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Exam has already ended!",
    });

  // Change exam status
  if (exam.status === ExamStatus.NOT_STARTED) {
    await prisma.exam.update({
      where: {
        id: exam.id,
      },
      data: {
        status: ExamStatus.STARTED,
      },
    });
  }
}

export function getTimeRemaining(exam: Exam) {
  const currentTime = new Date().getTime();
  const timeRemaining = exam.endTime.getTime() - currentTime;
  return timeRemaining; // in milliseconds
}
