import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db, mobiusers } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          // throw new Error("Invalid Credentials");
          console.log("Invalid Credentials");
        }

        // Find user in db through email
        const user: any = await db
          .select()
          .from(mobiusers)
          .where(eq(mobiusers.email, credentials?.email));

        // if user did't exists and hashPassword is not found then throw new Error
        if (!user || !user[0]?.password) {
          // throw new Error("Invalid Credentials");
          console.log("Invalid Credentials");
        }

        if (!user[0].emailverify) {
          // throw new Error("Email not verified");
          console.log("Email not verified");

          // return {
          //   error: "Email not verified !",
          // };
        }

        // Checking Password through bcrypt Compare
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user[0].password
        );

        if (!isCorrectPassword) {
          // throw new Error("Invalid Credentials");
          console.log("Invalid Credentials");
        }

        // If email and password matched then user will be returned
        // console.log("User inside ---> ", user);
        return user[0];
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // log out in 2 hours
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
