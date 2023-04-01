import { api } from "~/utils/api";

export default function useExam(index: number, team: string) {
  const utils = api.useContext();
  const examType = "WARM_UP";

  const questionQuery = api.exam.getExamQuestion.useQuery(
    {
      index: index,
      examType: examType,
    },
    {
      enabled: !!team,
    }
  );
  const questionStatusQuery = api.exam.getExamQuestionStatus.useQuery(
    {
      examType: examType,
    },
    {
      enabled: !!team,
    }
  );

  const answer = api.exam.setAnswer.useMutation({
    onSettled: async () => {
      await utils.exam.invalidate();
    },
  });

  const flag = api.exam.toggleFlagQuestion.useMutation({
    onSettled: async () => {
      await utils.exam.invalidate();
    },
  });

  const examStatus = api.exam.getExamStatus.useQuery({
    examType: examType,
  });

  return {
    questionQuery,
    questionStatusQuery,
    answer,
    flag,
    examStatus,
  };
}
