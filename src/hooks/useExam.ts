import { useEffect, useState } from "react";
import { clearAnswer } from "~/server/api/routers/routes/examRouter/mutateExamQuestion";
import { api } from "~/utils/api";

export default function useExam(index: number) {
  const utils = api.useContext();
  const examType = "PENYISIHAN";

  const [started, setStarted] = useState(false);

  const questionQuery = api.exam.getExamQuestion.useQuery(
    {
      index: index,
      examType: examType,
    },
    {
      enabled: started,
    }
  );
  const questionStatusQuery = api.exam.getExamQuestionStatus.useQuery(
    {
      examType: examType,
    },
    {
      enabled: started,
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

  const clearAnswer = api.exam.clearAnswer.useMutation({
    onSettled: async () => {
      await utils.exam.invalidate();
    },
  });

  useEffect(() => {
    if (examStatus.data?.isActive) {
      setStarted(true);
    } else {
      setStarted(false);
    }
  }, [examStatus.data?.isActive]);


  return {
    questionQuery,
    questionStatusQuery,
    answer,
    flag,
    examStatus,
    clearAnswer
  };
}
