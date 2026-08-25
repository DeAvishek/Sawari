import { z } from "zod"
export const userNameSchema = z.object({
    userName:z.string().min(4,"User name should be length 4").max(10,"User name is too long"),
})

export type userNameData = z.infer<typeof userNameSchema>