import { type NextPage } from "next";
import { api, setToken } from "~/utils/api";
import { Answer } from "@prisma/client";

const addUser: NextPage = () => {
  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (accessToken) => {
      if (!accessToken) return;
      setToken(accessToken);
    },
  });
  const addQuestion = api.question.createQuestion.useMutation({
    onError: async (error, context) => {
      if (error.message === "UNAUTHORIZED") {
        // refresh token
        await refreshToken.mutateAsync();
        addQuestion.mutate(context);
        return;
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
      answer: { value: Answer };
    };
    const question = target.question.value;
    const answer = target.answer.value;

    addQuestion.mutate({ correctAnswer: answer, questionPrompt: question });
  };

  const handleRefresh = () => {
    refreshToken.mutate();
    console.log("refreshed");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <textarea name="question" />
        <br />
        <label htmlFor="answer">Answer</label>
        <select name="answer">
          <option value={Answer.A}>A</option>
          <option value={Answer.B}>B</option>
          <option value={Answer.C}>C</option>
          <option value={Answer.D}>D</option>
        </select>
        <br />
        <button type="submit">create</button>
      </form>
      <button onClick={handleRefresh}>RefreshToken</button>
    </>
  );
};

export default addUser;
