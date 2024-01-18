"use client";
import { questions } from "@/_mocks/questions";
import { redirect, useParams } from "next/navigation";

export default function PublicSurveysPage() {
  const { surveyId } = useParams();
  const { id: questionId } = questions[0];

  return redirect(`/surveys/${surveyId}/questions/${questionId}`);
}
