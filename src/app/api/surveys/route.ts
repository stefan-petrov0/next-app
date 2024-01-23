import prisma from "@/lib/prisma";
import SurveySchema from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";

export const GET = routeHandler(async () => {
  const surveys = await prisma.survey.findMany({});
  return surveys;
});

export const POST = routeHandler(async (request) => {
  console.log('POST request received'); // Add this line  
  const body = await request.json();
  console.log('Received data:', body);
  const validation = await SurveySchema.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;

  const survey = await prisma.survey.create({
    data,
  });

  return survey;
});
