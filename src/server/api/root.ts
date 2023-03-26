import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/routes/userRouter/index";
import { examRouter } from "./routers/routes/examRouter/examRouter";
import { questionRouter } from "./routers/question";
import { cmsRouter } from "./routers/routes/cmsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  exam: examRouter,
  question: questionRouter,
  cms: cmsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
