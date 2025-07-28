import { z } from "zod";

export const assignmentSchema = z.object({
  title: z.string().min(8, "Assignment title must be 8 characters long"),
  description: z.string().min(10, "Assignment description must be 10 characters long"),
  pdf: z.any().refine((file) => file?.length === 1, "PDF is required"),
  dueDate: z.string().refine((date) => new Date(date) > new Date(), "Due date must be greater than Current Date"),
});

export type AssignmentForm = z.infer<typeof assignmentSchema>;
