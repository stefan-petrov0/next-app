import { z } from "zod";

const QuestionAnswer = z.object({
    answer: z.string(),
});

export default QuestionAnswer;
