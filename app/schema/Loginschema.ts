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