import { type NextPage } from "next";
import { api } from "~/utils/api";
import { Answer } from "@prisma/client";

const addUser: NextPage = () => {
  const addQuestion = api.question.createQuestion.useMutation();

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
    </>
  );
};

export default addUser;
