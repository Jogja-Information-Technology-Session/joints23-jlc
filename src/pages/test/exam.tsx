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

  const handleRefresh = () => {
    refreshToken.mutate();
    console.log("refreshed");
  };

  const addQuestion = api.question.inputQuestion.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  // get all question
  const questions = api.question.getAll.useQuery(undefined, {
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
    enabled: false,
  });

  // get warm up question by index (private)
  const question = api.exam.getWarmUpQuestion.useQuery(
    { index: 0 },
    {
      onError: (error) => {
        if (error.message === "UNAUTHORIZED") {
          refreshToken
            .mutateAsync()
            .then(() => {
              void question.refetch();
            })
            .catch(() => {
              console.log("error");
            });
        }
      },
      retry: 0,
      enabled: false,
    }
  );

  const handleGet = () => {
    questions
      .refetch()
      .then((questions) => {
        console.log(questions.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetQuestion = () => {
    question
      .refetch()
      .then((question) => {
        console.log(question.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={handleRefresh}>RefreshToken</button>
      <img src="https://drive.google.com/uc?export=view&id=1rH8GNTqmxpqYqWY-6h4zAIrQADi1SOwO" />
      <button onClick={() => addQuestion.mutate()}>add question</button>
      <br />
      {/* <button onClick={handleGetQuestion}>get questions</button> */}
      <button
        onClick={() => {
          console.log(questions.data);
        }}
      >
        get questions
      </button>

      <button onClick={handleGet}>get once questions</button>
      <br />
      <button onClick={handleGetQuestion}>get question</button>
    </>
  );
};

export default addUser;
