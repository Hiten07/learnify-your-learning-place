import { z } from 'zod';

export const signupSchema = z.object({
  
  firstname: z
            .string()
            .min(2,"firstname must be minimum of 2 numbers"),  
  lastname: z
            .string()
            .min(2,"lastname must be minimum of 2 numbers"),  
  email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .email('Invalid email address'),
  phonenumber: z
            .string()
            .regex((/^[0-9]{10}$/),'phonenumber must be 10 digits'),
  password: z
            .string()
            .min(8, 'Password must be at least 8 characters'),
  role: z.array(z.string()).min(1,'role must be minimum one')
});

// Optionally, infer the type from the schema for type-safety
export type signupFormInputs = z.infer<typeof signupSchema>;