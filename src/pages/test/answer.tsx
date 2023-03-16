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

  // get warm up question by index (private)
  const question = api.exam.getExamQuestion.useQuery(
    { index: 0, examType: "WARM_UP" },
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

  const questionsStatus = api.exam.getExamQuestionStatus.useQuery(
    { examType: "WARM_UP" },
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

  const updateAnswer = api.exam.setAnswer.useMutation({
    onSuccess: () => {
      console.log("success");
    },
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
  });

  const handleGetQuestion = () => {
    question
      .refetch()
      .then((question) => {
        console.log(question.data);
      })
      .catch((err) => console.log(err));
  };

  const clearAnswer = api.exam.clearAnswer.useMutation({
    onSuccess: () => {
      console.log("success");
    },
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
  });

  return (
    <>
      <button onClick={handleRefresh}>RefreshToken</button>
      <br />
      <button onClick={handleGetQuestion}>get question</button>
      <br />
      <button
        onClick={() => {
          questionsStatus
            .refetch()
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        get all question status
      </button>
      <br />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const input = (e.target as HTMLFormElement).optionId.value;
          updateAnswer.mutate({
            examQuestionId: "640e1015c226f18fe4fe4724",
            examType: "WARM_UP",
            index: 0,
            optionId: input as string,
          });
        }}
      >
        <input className="outline-double" type="text" name="optionId" />
        <button type="submit">submit</button>
      </form>
      <br />
      <button
        onClick={() => {
          clearAnswer.mutate({
            examQuestionId: "640e1015c226f18fe4fe4724",
            examType: "WARM_UP",
            index: 0,
          });
        }}
      >
        clear answer
      </button>
    </>
  );
};

export default addUser;
