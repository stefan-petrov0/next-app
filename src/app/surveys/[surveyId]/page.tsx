"use client";
import { QuestionsDTO } from "@/types/QuestionDTO";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


type SurveyDTO = {
  id: string;
  name: string;
  introduction: string | null;
  manager: string;
  status: string;
  updatedAt: string;
  createdAt: string;
};

export default function PublicSurveysPage() {
  const rt = useRouter();
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);
  const [survey, setSurvey] = useState<SurveyDTO>();

  const getSurvey = async () => {
    try {
      const response = await fetch(`/api/surveys/${surveyId}`);
      const responseData = await response.json();
      const surveyData = responseData.data;
      setSurvey(surveyData);
    } catch (error) {
      console.error("Error fetching survey:", error);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await fetch(`/api/surveys/${surveyId}/questions`);
      const data: QuestionsDTO = await response.json();
      const filteredQuestions = data.data.filter(
        (question) => question.position !== undefined
      );
      const sortedQuestions = filteredQuestions.sort(
        (a, b) => a.position! - b.position!
      );

      setQuestions(sortedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getSurvey();
    getQuestions();
  }, [surveyId]);

  const handleStartButtonClick = () => {
    if (questions.length > 0) {
      rt.push(`/surveys/${surveyId}/questions/${questions[0]?.id}`);
    }
  };

  return (
        <div className="flex flex-col justify-center h-full gap-y-20 bgimage">
          <h1 className="text-7xl font-semibold	text-center text-black">
            {survey?.introduction}
          </h1>
          <div className="text-center">
            <button className="text-4xl border px-14 py-2 rounded-lg bg-white bg-opacity-60" onClick={handleStartButtonClick}>Start Survey</button>
          </div>
        </div>
  );
}
