"use server";
import { authOptions } from "@/utils/AuthOptions";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";

// Define a type for the session object
interface SessionType {
  user?: {
    email?: string;
    name?: string;
    image?: string;
    //   id?: string,

    // Add other user properties here if needed
  };
  // Add other session properties here if needed
}

// Define a type for the user object
interface UserType {
  email: string;

  // Add other user properties here if needed
}

export async function getSession(): Promise<SessionType | null> {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    // console.log("session --->", session);

    if (!session?.user?.email) {
      return null;
    }

    const data = session.user;
    // console.log("🚀 ~ getCurrentUser ~ data:", data);

    let currentUser: any;

    currentUser = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, session.user.email as string));

    if (currentUser.length == 0) {
      currentUser = await db
        .insert(mobiusers)
        .values({
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          password: "",
          rewardbalance: "0",
          referencecode: "",
          firstpurchase: false,
          emailverify: false,
          membership: "regular",
        })
        .returning();
    }
    // console.log("current user inside ---> ", currentUser[0]);

    return currentUser[0];
  } catch (error: any) {
    console.log(error, "Error in getCurrentUser");
    // return null;
  }
}
