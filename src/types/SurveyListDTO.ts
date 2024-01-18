import { Survey } from "@prisma/client";
import { GenericApiResponse } from "./GenericApiResponse";

export type SurveyListDTO = GenericApiResponse<Survey[]>;
