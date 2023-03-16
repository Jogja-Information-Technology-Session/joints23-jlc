import { createTRPCRouter } from "~/server/api/trpc";
import { createWarmUpExam } from "./createExam";
import {
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
} from "./getExamQuestion";
import { clearAnswer, setAnswer } from "./updateExamQuestion";

export const examRouter = createTRPCRouter({
  createWarmUpExam,
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
  setAnswer,
  clearAnswer,
});
