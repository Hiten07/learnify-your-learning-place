import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  description: z.string().min(1, "Lesson description is required"),
  video: z.any().refine((fileList) => fileList && fileList.length > 0, {
    message: "Video file is required",
  }),
  pdf: z.any().optional(),
});

export const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().min(1, "Module description is required"),
  lessons: z.array(lessonSchema).min(1, "Each module must have at least one lesson"),
});

export const courseSchema = z.object({
  title: z.string().min(5, "Course title must be of 6 characters long"),
  price: z.number().min(1, "Course price must be greater than 0"),
  duration: z.number().min(30, "Course duration in days must be greater than 30"),
  description: z.string().min(10, "Course description is required and need 10 characters atleast"),
  modules: z.array(moduleSchema).min(1, "Course must have at least one module"),
});

export type CourseForm = z.infer<typeof courseSchema>;
