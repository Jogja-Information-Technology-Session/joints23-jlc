import { createTRPCRouter } from "~/server/api/trpc";
import { createExam } from "./createExam";
import {
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
} from "./getExamQuestion";
import {
  clearAnswer,
  setAnswer,
  toggleFlagQuestion,
} from "./updateExamQuestion";

export const examRouter = createTRPCRouter({
  createExam,
  getWarmUpExamQuestions,
  getExamQuestion,
  getExamQuestionStatus,
  setAnswer,
  clearAnswer,
  toggleFlagQuestion,
});
