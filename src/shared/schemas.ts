import { z } from "zod";

export const CreateTodoSchema = z.object({
  name: z.string({
    required_error: "This field is required.",
  }),
  isCompleted: z.boolean().default(false),
});

export type CreateTodoSchema = z.infer<typeof CreateTodoSchema>;
