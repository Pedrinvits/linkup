import { db } from "@/lib/db";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import email from "next-auth/providers/email";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {

                },
                password: {

                }
            },
            async authorize(credentials, req) {

                const password = credentials.password as string
                const email = credentials.email as string

                if (!email || !password) {
                    return null;
                }
                const infos = {
                    email,
                    password
                }

                const url = "http://localhost:8888/api/login"

                const res = await fetch(url,{
                    method : "POST",
                    headers : { "Content-Type": "application/json" },
                    body: JSON.stringify(infos),
                })
                const datafetch = await res.json();

                if(datafetch.error){
                    return null
                }
                const data = {
                    ...datafetch.data,
                    token: datafetch.token, 
                  };
                  console.log('AUTH = ',data);
                  
                return {data}
            }
        }),
    ], callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            console.log('token - ',token);
            return token
        },
        async session({ session, token }) {
            console.log('sesstion - ',session);
            
            session = token.user as any
            return session
        }
    },
});