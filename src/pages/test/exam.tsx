// /* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { api, setToken } from "~/utils/api";

const addUser: NextPage = () => {
  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (accessToken) => {
      if (!accessToken) return;
      setToken(accessToken);
    },
  });

  const questions = api.exam.getQuestions.useQuery(undefined, {
    onError: (error) => {
      if (error.message === "UNAUTHORIZED") {
        refreshToken
          .mutateAsync()
          .then(() => {
            void questions.refetch();
          })
          .catch(() => {
            console.log("error");
          });
      }
    },
  });

  console.log(questions.data);

  const handleRefresh = () => {
    refreshToken.mutate();
    console.log("refreshed");
  };

  return (
    <>
      <button onClick={handleRefresh}>RefreshToken</button>
    </>
  );
};

export default addUser;
