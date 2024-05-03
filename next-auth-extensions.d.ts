import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      sub: string;
      id: number;
      userId: string;
      avatarUrl: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      iat: number;
      exp: number;
      jti: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string;
    sub: string;
    id: number;
    userId: string;
    avatarUrl: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
