import * as z from 'zod'

export const LoginSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(1,{
        message : "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email é obrigatório"
    }),
    password: z.string().min(6, {
        message: "Mínimo 6 letras"
    }),
    name: z.string().min(1, {
        message: "Nome é obrigatório"
    }),
    phone: z.string()
        .min(1, {
            message: "Telefone é obrigatório"
        })
        .regex(/^\S*$/, {
            message: "Telefone não pode conter espaços"
        })
});

export const ProfileSchema = z.object({
    location: z
    .string()
    // .min(4, { message: "Minimum 4 characters required" })
    .optional(),
    username: z
        .string()
        // .min(4, { message: "Minimum 4 characters required" })
        .regex(/^\S*$/, {
            message: "Username cannot contain spaces"
        }),
        // .optional(),
    bio: z
        .string()
        // .min(1, { message: "Bio is required" })
        .optional(),
    website: z
        .string()
        // .min(1, { message: "Website is required" })
        .optional(),
})