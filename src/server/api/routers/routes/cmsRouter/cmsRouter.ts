import { createTRPCRouter } from "~/server/api/trpc";

import { addQuestion } from "./mutateQuestion";
import { getAllExamsRoute } from "./exam";

export const cmsRouter = createTRPCRouter({
    addQuestion,
    getAllExamsRoute,
});