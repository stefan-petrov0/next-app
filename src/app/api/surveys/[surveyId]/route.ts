import prisma from "@/lib/prisma";
import Survey from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";

export const GET = routeHandler(async (_, context) => {
  const { surveyId } = context.params;
  const survey = await prisma.survey.findUniqueOrThrow({
    where: {
      id: surveyId,
    },
  });

  return survey;
});

export const PATCH = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const body = await request.json();

  const validation = await Survey.safeParseAsync(body);
  if (!validation.success) {
    throw validation.error;
  }
  const { data } = validation;
  const survey = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data,
  });
  return survey;
});

export const DELETE = routeHandler(async (_, context) => {
  const { surveyId } = context.params;

  await prisma.survey.delete({
    where: {
      id: surveyId,
    },
  });
});
