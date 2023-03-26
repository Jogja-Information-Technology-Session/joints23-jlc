import { api } from "~/utils/api";

export default function useExam(index: number, team: string) {
  const utils = api.useContext();

  const questionQuery = api.exam.getExamQuestion.useQuery(
    {
      index: index,
      examType: "WARM_UP",
    },
    {
      enabled: !!team,
    }
  );
  const questionStatusQuery = api.exam.getExamQuestionStatus.useQuery(
    {
      examType: "WARM_UP",
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

  return {
    questionQuery,
    questionStatusQuery,
    answer,
    flag,
  };
}
