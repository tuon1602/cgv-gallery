import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        userId: {
          label: "userId",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
      // @ts-ignore
      async authorize(credentials){
        const user = await prisma.user.findUnique({
          where: {
            userId: credentials?.userId,
          },
        });
        if (user) {
          const passwordToCompare: string = credentials?.password || "";
          const passwordMatch = await bcrypt.compare(
            passwordToCompare,
            user.password
          );
          if (passwordMatch) {
            const {password,...userWithoutPassword} = user
            return userWithoutPassword;
          }
        }
        return null
      },
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  jwt:{
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 3600,
  },
  callbacks:{
    async jwt({token,user}) : Promise<any> {
      return {...token,...user}
    },
    async session({session,token,user}): Promise<any> {
      session.user = token
      return session
    }
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
