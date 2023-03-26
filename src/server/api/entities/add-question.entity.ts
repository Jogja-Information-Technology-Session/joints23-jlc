import { type ExamType } from "@prisma/client";

export interface IAddQuestion {
    question: string;
    image: string | null;
    type: ExamType;
    options: IAddQuestionOptions[];
}

export interface IAddQuestionOptions {
    prompt: string;
    isCorrect: boolean;
}