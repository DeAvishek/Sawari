import { z } from "zod";
export const LoginScheam=z.object({
    userName:z.string().
               min(4,"Username should be 4 charcter long")
               .max(10,"Username no more than 10 characters long"),
    
    phoneNumber:z.string()
                .min(10,"Phone number length is 10")
                .max(10,"Phone number length is 10")
})
export type LoginFormData = z.infer<typeof LoginScheam>;

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
