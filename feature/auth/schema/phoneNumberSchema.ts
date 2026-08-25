import { z } from "zod";
export const phoneNumberSchema = z.object({
    phoneNumber:z.string().min(10,"Valid Phone Number Required").max(10,"Valid Phone Number Required")
});
export type phoneNumberData = z.infer<typeof phoneNumberSchema>;
