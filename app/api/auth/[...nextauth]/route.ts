import bcrypt from 'bcrypt';

import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import {PrismaAdapter} from "@next-auth/prisma-adapter";

// import {prisma} from '../../../libs/prismadb';

import {prisma} from '../../../libs/prismadb';
// import prisma from "@/app/libs/prismadb";
// import prisma from "../../../prismadb";
// import async from './../../../node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf';




export const authOptions:AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email:{label:'email', type:'text'},
                password:{label:'password', type:'password'} 
            },
           async authorize(credentials) {
            console.log("authorize called with:", credentials);
            if(!credentials ?.email || !credentials?.password) {
                throw new Error('Invalid Credentials');
            }

            const user = await prisma.user.findUnique({
                where: {
                   email:credentials.email
                }
            });

            if(!user || !user?.hashedPassword) {
                throw new Error('Invalid Credentials');
            }

            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            )

            if(!isCorrectPassword) {
                throw new Error("Invalid Credentials")
            }
            console.log("Everything alright")
            return user;
           }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy:"jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
