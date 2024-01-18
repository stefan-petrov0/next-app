import { z } from "zod";

const Question = z.object({
  text: z.string(),
  required: z.boolean().default(true),
  position: z.number().min(0).optional(),
});

export default Question;
