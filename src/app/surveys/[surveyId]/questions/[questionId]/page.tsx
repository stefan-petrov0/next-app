"use client";
import { questions } from "@/_mocks/questions";
import { useParams } from "next/navigation";
import { FormEventHandler, useMemo } from "react";

export default function PublicSurveyQuestionPage() {
  const { questionId } = useParams();
  const questionData = useMemo(() => {
    return questions.find(
      (question) => question.id.toString() === (questionId as string)
    );
  }, [questionId]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    console.log(formData.get("answer"));
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <h1 className="text-lg font-bold">{questionData?.text}</h1>
      <textarea
        name="answer"
        rows={10}
        className="p-2"
        required={questionData?.required || false}
      ></textarea>
      <button
        type="submit"
        className="bg-primary p-2 text-white font-bold rounded-md uppercase"
      >
        Next
      </button>
    </form>
  );
}
