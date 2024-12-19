"use server"
import * as z from 'zod'

import { db } from '@/lib/db';
import * as bcrypt from "bcrypt-ts";
import { RegisterSchema } from '../../schemas';
import { getUserByEmail, getUserByUsername } from '../../data/user';
import { url } from 'inspector';

export const Register = async (values : z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error : "Invalid Fields"
        };
    }
    const {email, password, name,phone} = validatedFields.data

    const fields = {
        email,
        password,
        name,
        phone
    }
    // console.log(fields);
    
    try{
        const url = "http://localhost:8888/api/register";
        const res = await fetch(url, {
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body: JSON.stringify(validatedFields.data),
        })
        const data = await res.json();
        
        if(data.errors){
            return {error : "Usuário já cadastrado" }
        }
        
    }
    catch(error){
        throw error;
    }

    return { sucess : "Usuário criado com sucesso!"};
}