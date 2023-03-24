import { createTRPCRouter } from "~/server/api/trpc";
import { createExam, submitExam } from "./mutateExam";
import {
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
} from "./queryExamQuestion";
import {
  clearAnswer,
  setAnswer,
  toggleFlagQuestion,
} from "./mutateExamQuestion";

export const examRouter = createTRPCRouter({
  createExam,
  submitExam,
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
  setAnswer,
  clearAnswer,
  toggleFlagQuestion,
});
