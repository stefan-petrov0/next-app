"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormEventHandler } from "react";
import { QuestionDTO, QuestionsDTO } from "@/types/QuestionDTO";
import { useRouter } from "next/navigation";

export default function PublicSurveyQuestionPage() {
  const router = useRouter();
  const { surveyId, questionId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);
  const [questionData, setQuestionData] = useState<QuestionDTO["data"]>();
  const currentQuestionId = Array.isArray(questionId) ? questionId[0] : questionId;


  const getQuestions = async () => {
    try {
      const response = await fetch(`/api/surveys/${surveyId}/questions`);
      const data: QuestionsDTO = await response.json();
      const sortedQuestions = data.data
        .filter(question => question.position !== undefined)
        .sort((a, b) => a.position! - b.position!);

      setQuestions(sortedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getQuestionData = async (qid: string) => {
    try {
      const response = await fetch(`/api/surveys/${surveyId}/questions/${qid}`);
      const data: QuestionDTO = await response.json();
      setQuestionData(data.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [surveyId]);

  useEffect(() => {
    if (questionId && questions.length > 0) {
      const index = questions.findIndex(q => q.id === questionId);
      if (index > -1) {
        setCurrentQuestionIndex(index);
      }
    }
  }, [questionId, questions]);

  useEffect(() => {
    if (currentQuestionId) {
      getQuestionData(currentQuestionId);
    }
  }, [currentQuestionId]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer") as string;

    const answerEndpoint = `/api/surveys/${surveyId}/questions/${currentQuestionId}/answers`;

    try {
      const response = await fetch(answerEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (response.ok) {
        if (currentQuestionIndex < questions.length - 1) {
          const nextQuestionId = questions[currentQuestionIndex + 1].id;
          router.push(`/surveys/${surveyId}/questions/${nextQuestionId}`);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          console.log("Survey completed");
          router.push(`/surveys/completed`);
        }
      } else {
        console.error("Failed to submit answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  return (
    <div className="h-screen bgimage">
      <div>
        {/* Any additional content you want to display */}
      </div>
      <div className="absolute bottom-0 w-full mb-30">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-3xl font-bold text-center" style={{color:"black"}}>{questionData?.text}</h1>
          <div className="flex justify-center mb-10 mt-20">
            <div className="w-2/3">
              <textarea name="answer" rows={6} className="w-full border-2 rounded-md text-2xl py-3 px-3 bg-white bg-opacity-60" style={{ resize: "none" }} required={questionData?.required || false} placeholder="Your Answer Here"></textarea>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="px-4 py-2 text-white font-bold rounded-md uppercase" style={{ backgroundColor: "#d9d9d9", color: "black" }}>
              Next Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
