import {z} from "zod";

export const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

export const loginSchema = z.object({
    email: z.
        string("please enter a valid email")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"enter valid email address")
        .email("Invalid email address"),

    password: z
            .string()
            .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
                    .string()
                    .min(4,'Password must be at least 8 characters long'),
    role: z.string().min(1,'role must be minimum one')
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password and Confirm Password must match!",
      path: ["confirmPassword"],
})

export type loginFormValidations = z.infer<typeof loginSchema>;