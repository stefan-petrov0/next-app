import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import { isUndefined } from "lodash";

export const PATCH = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const data = await request.json();

  const question = await prisma.question.findFirstOrThrow({
    where: {
      id: questionId,
      surveyId,
    },
  });

  
  
  if (!isUndefined(data.position) && question.position !== data.position) {
    const [positionFrom, positionTo] = [
      question.position,
      data.position,
    ];


    if(positionTo > positionFrom){
      let questionsToReposition = await prisma.question.findMany({
        where: {
          surveyId,
          position: {
            gt: positionFrom,
            lte: positionTo
          },
        },
      });

      let updatedQuestions = questionsToReposition.map((q) => {
        const newPosition = q.position - 1;
        return prisma.question.update({
          where: { id: q.id },
          data: { position: newPosition },
        });
      });

      await prisma.$transaction(updatedQuestions);

    }else{
      let questionsToReposition = await prisma.question.findMany({
        where: {
          surveyId,
          position: {
            gte: positionTo,
            lt: positionFrom
          },
        },
      });

      let updatedQuestions = questionsToReposition.map((q) => {
        const newPosition = q.position + 1;
        return prisma.question.update({
          where: { id: q.id },
          data: { position: newPosition },
        });
      });

      await prisma.$transaction(updatedQuestions);
    }
  }

  const response = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        update: {
          where: {
            id: questionId,
          },
          data,
        },
      },
    },
  });

  return response;
});

export const GET = routeHandler(async (_, context) => {
  const { surveyId, questionId } = context.params;
  const response = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  return response;
})

export const DELETE = routeHandler(async (_, context) => {
  const { surveyId, questionId } = context.params;
  const questionToDelete = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!questionToDelete) {
    return { error: "Question not found" };
  }


  let questionsToReposition = await prisma.question.findMany({
    where: {
      surveyId,
      position: {
        gt: questionToDelete.position,
      },
    },
  });

  let updatedQuestions = questionsToReposition.map((q) => {
    const newPosition = q.position - 1;
    return prisma.question.update({
      where: { id: q.id },
      data: { position: newPosition },
    });
  });

  await prisma.$transaction(updatedQuestions);


  const response = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        delete: {
          id: questionId,
        },
      },
    },
    include: {
      questions: true,
    },
  });

  return response;
});
