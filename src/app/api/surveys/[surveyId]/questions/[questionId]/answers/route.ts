import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import QuestionAnswer from "@/schemas/QuestionAnswer";
import { HfInference } from "@huggingface/inference";
import { SentimentLabel } from "@prisma/client";

export const POST = routeHandler(async (request, context) => {
    const { questionId } = context.params;

    const survey = await prisma.question.findUniqueOrThrow({
        where: {
            id: questionId,
        },
    });

    const body = await request.json();

    const validation = await QuestionAnswer.safeParseAsync(body);

    if (!validation.success) {
        throw validation.error;
    }

    const { data } = validation;

    const hf = new HfInference();
    const sentiment = await hf.textClassification({
        model: "distilbert-base-uncased-finetuned-sst-2-english",
        inputs: data.answer,
    });

    const maxSentiment = sentiment.reduce((max, currentSentiment) =>
        currentSentiment.score > max.score ? currentSentiment : max
    );

    const questionAnswer = await prisma.questionAnswer.create({
        data: {
            ...data,
            questionId,
            sentimentLabel: maxSentiment.label as SentimentLabel,
            sentimentScore: +maxSentiment.score.toFixed(5),
        },
    });

    return questionAnswer;
});