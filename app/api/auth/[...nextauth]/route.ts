import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/authOptions";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST  };
