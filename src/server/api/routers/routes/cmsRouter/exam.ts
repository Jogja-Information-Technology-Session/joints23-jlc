import { getAllExams } from "~/server/api/services/cmsService";
import { adminProcedure } from "~/server/api/trpc";

export const getAllExamsRoute = adminProcedure.query(async ({ctx}) => {
    return await getAllExams(ctx.prisma);
})