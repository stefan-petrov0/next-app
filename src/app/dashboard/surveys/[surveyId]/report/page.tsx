"use client";
import { useParams } from "next/navigation";

export default function SurveyReportPage() {
  const { surveyId } = useParams();

  return (
    <div className="flex flex-col gap-5">
      Welcome to the Survey ({surveyId}) report page!
    </div>
  );
}
