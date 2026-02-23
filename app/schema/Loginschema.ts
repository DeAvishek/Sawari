import { z } from "zod";
export const LoginSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .max(10, "Username must be within 10 characters"),

  phoneNumber: z
    .string()
    .min(10, "Invalid phone number")
    .max(10, "Phone number must be 10 digits"),
});
export type LoginFormData = z.infer<typeof LoginSchema>;