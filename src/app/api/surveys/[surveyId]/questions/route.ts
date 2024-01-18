import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import Question from "@/schemas/Question";

export const GET = routeHandler(async (_, context) => {
  const { surveyId } = context.params;
  const questions = await prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
    orderBy: {
      position: "asc",
    },
  });

  return questions;
});

export const POST = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const survey = await prisma.survey.findUniqueOrThrow({
    where: {
      id: surveyId,
    },
    include: {
      questions: true,
    },
  });

  const body = await request.json();
  const validation = await Question.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;
  const surveyWithQuestions = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        create: {
          position: survey.questions.length,
          ...data,
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return surveyWithQuestions;
});
