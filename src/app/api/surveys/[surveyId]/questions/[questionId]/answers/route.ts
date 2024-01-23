import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import QuestionAnswer from "@/schemas/QuestionAnswer";

export const POST = routeHandler(async (request, context) => {
    const { surveyId, questionId } = context.params;
    const body = await request.json();

    try {
        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            },
        });

        if (!question) {
            return {
                error: "Question not found",
                status: 404,
            };
        }

        const validation = await QuestionAnswer.safeParseAsync(body);
        if (!validation.success) {
            throw validation.error;
        }

        const { data } = validation;

        const answeredQuestion = await prisma.question.update({
            where: {
                id: questionId,
            },
            data: {
                answers: {
                    create: {
                        ...data,
                    },
                },
            },
            include: {
                answers: true,
            },
        });

        return answeredQuestion;
    } catch (e) {
        return {
            error: "Something went wrong...",
            status: 500,
        };
    }
});
