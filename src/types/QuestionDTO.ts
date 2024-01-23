import { Question } from "@prisma/client";
import { GenericApiResponse } from "./GenericApiResponse";

export type QuestionsDTO = GenericApiResponse<Question[]>;
export type QuestionDTO = GenericApiResponse<Question>;
