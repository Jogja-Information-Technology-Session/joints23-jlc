import { createTRPCRouter } from "~/server/api/trpc";
import { createWarmUpExam } from "./createExam";
import { getWarmUpExamQuestions, getWarmUpQuestion } from "./getExamQuestion";

export const examRouter = createTRPCRouter({
  createWarmUpExam,
  getWarmUpExamQuestions,
  getWarmUpQuestion,
});
