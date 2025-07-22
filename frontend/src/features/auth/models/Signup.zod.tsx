import { passwordValidation } from './Login.zod';
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
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please enter valid email address")
        .email('Invalid email address'),
  phonenumber: z
            .string()
            .regex((/^[0-9]{10}$/),'phonenumber must be 10 digits'),
  password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(passwordValidation,{
                message: 'Your password is not valid, it must contains 1 upper case, 1 lower case and 1 special character',
              }),
  role: z.string().min(1,'role must be minimum one')
});

export type signupFormInputs = z.infer<typeof signupSchema>;