/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { login, register } from "@/services/auth";

// export type User = DefaultUser & {
//     id: string;
//     token: string;
//     employer: boolean;
//     emloyee: boolean;
//     // company: string;
// };

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      token?: string;
      employer?: string;
      employee?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    token?: string;
    employer?: string;
    employee?: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        try {
          const res = await login(
            credentials?.username || "",
            credentials?.password || ""
          );
          if (res) return res;
          return null;
        } catch (err: any) {
          if (err?.response?.data?.code === "user_is_blocked") {
            throw new Error("error_blocked"); // נזרוק שגיאה מותאמת
          }
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // session: {
  //     // 2 minute
  //     maxAge: 60 * 2,
  //     updateAge: 60 * 2,
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login", // דף לטיפול בשגיאות מותאם אישית
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") {
        return true;
      }

      if (!account || !user.email) {
        console.error("Account or user email is missing");
        return false;
      }

      try {
        const res = await login(user?.email || "", user.id || "");

        if (res == "user_is_blocked") {
          return "/login?error=error_blocked"; // ניתוב לדף עם הודעה על החסימה
        }

        if (res) {
          user.token = res.token;
          user.id = res.id;
          user.employer = res.employer;
          user.employee = res.emloyee;
          return true;
        }
      } catch (err: any) {
        // console.log('err', err);
        // return false;
      }

      try {
        const res = await register(
          user?.email || "",
          user.id || "",
          user?.email || ""
        );
        if (res) {
          const login_res = await login(user?.email || "", user.id || "");
          if (login_res) {
            user.token = login_res.token;
            user.id = login_res.id;
            user.employer = login_res.employer;
            user.employee = login_res.emloyee;
            return true;
          }
          return false;
        }
        return false;
      } catch (err: any) {
        return false;
      }
    },
    async session({ session, token, user }: any) {
      // if (session.rememberMe) {
      //     session.maxAge = 30 * 24 * 60 * 60; // 30 days
      //     session.updateAge = 24 * 60 * 60; // 24 hours
      // }

      session.user.id = token?.id;
      // session.user.company = token?.company;
      session.user.token = token?.token;
      session.user.employer = token?.employer;
      session.user.employee = token?.emloyee;

      return session;
    },
    async jwt({ token, user }: any) {
      //console.log('jwt', token, user);
      if (user) {
        token.token = user?.token;
        token.id = user?.id;
        token.employer = user?.employer;
        token.employee = user?.emloyee;
        //token.company = user?.company;
      }
      return token;
    },
  },
};
