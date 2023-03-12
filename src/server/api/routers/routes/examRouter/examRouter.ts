import { createTRPCRouter } from "~/server/api/trpc";
import { createWarmUpExam } from "./createExam";
import { getWarmUpExamQuestions } from "./getExam";

export const examRouter = createTRPCRouter({
  createWarmUpExam,
  getWarmUpExamQuestions,
});
