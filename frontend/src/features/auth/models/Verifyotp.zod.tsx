import {z} from "zod";

export const verifyOtpSchema = z.object({
    otp: z
        .string()
        .min(6,{
            message: "otp must be 6 digits"
    })
})

export type verifyOtpSchemaValidations = z.infer<typeof verifyOtpSchema>;