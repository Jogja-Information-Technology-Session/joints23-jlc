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

  const createExam = api.exam.createExam.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const handleCreateExam = () => {
    createExam.mutate({
      examType: "WARM_UP",
    });
  };

  return (
    <>
      <button onClick={handleRefresh}>RefreshToken</button>
      <br />
      <button onClick={handleCreateExam}>Create Exam</button>
      <br />
    </>
  );
};

export default CreateExam;
