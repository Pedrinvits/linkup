"use server"
import * as z from 'zod'


// import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { signIn } from '../../auth';
import { LoginSchema } from '../../schemas';

export const Login = async (values : z.infer<typeof LoginSchema> ) => {

    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error : "Invalid Fields"
        };
    }

    const {email,password} = validatedFields.data;

    try {
       
        await signIn("credentials",{
            email,
            password,
            // redirectTo : DEFAULT_LOGIN_REDIRECT
            redirectTo : "/"
        })

        return { sucess : "Sucess!"};
        
    }catch(error){
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin" :
                    return {error : "Credenciais inválidas"};
                default :
                    return {error : "Something went wrong"};
            }
        }
        throw error;
    }
}