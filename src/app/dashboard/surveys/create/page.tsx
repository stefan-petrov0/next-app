"use client";
// import { useRouter } from 'next/navigation';
import SurveyForm from "@/components/SurveyForm/SurveyForm";
import { useRouter } from 'next/navigation';
import { Router } from "next/router";


export default function SurveyCreatePage() {
  const userouter = useRouter();

  const handleCreateSurvey = async (formData:FormData) => {
    // "use server";

    const formDataObject: Record<string, string> = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });

    const jsonData = JSON.stringify(formDataObject);
      
    try{
      const response = await fetch('http://localhost:3000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })

      const data = await response.json();
      console.log(data.data.id)

      if (data.data.id) {
        console.log('Redirecting to:', `http://localhost:3000/dashboard/surveys/${data.data.id}`);
        return userouter.push(`/dashboard/surveys/${data.data.id}`);
        // permanentRedirect(`http://localhost:3000/dashboard/surveys/${data.data.id}`);
      } else {
        console.error('Survey ID is undefined in the API response:', data);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return <SurveyForm title="Create a Survey" surveyAction={handleCreateSurvey} />;
}
