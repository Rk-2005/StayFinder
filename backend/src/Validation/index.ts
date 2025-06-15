import {string, z} from "zod"

export const SignupSchema=z.object({
    name:z.string().min(2),
    email:z.string(),
    password:z.string(),
    role:z.string()
})

export const SigninSchema=z.object({
    email:z.string(),
    password:z.string()
})

