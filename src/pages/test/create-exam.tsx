// /* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { api, setToken } from "~/utils/api";

const CreateExam: NextPage = () => {
  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (accessToken) => {
      if (!accessToken) return;
      setToken(accessToken);
    },
  });

  const handleRefresh = () => {
    refreshToken.mutate();
    console.log("refreshed");
  };

  const createExam = api.exam.createWarmUpExam.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const getQuestions = api.exam.getWarmUpExamQuestions.useQuery(undefined, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleCreateExam = () => {
    createExam.mutate();
  };

  return (
    <>
      <button onClick={handleRefresh}>RefreshToken</button>
      <br />
      <button onClick={handleCreateExam}>Create Exam</button>
      <br />
      <button
        onClick={() => {
          getQuestions
            .refetch()
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Get Questions
      </button>
    </>
  );
};

export default CreateExam;
