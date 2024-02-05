"use server";

import { db, mobiusers } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

interface CheckVerifiedUserProps {
  email?: string;
}

export async function CheckVerifiedUser(options: CheckVerifiedUserProps = {}) {
  try {
    const { email } = options;

    if (!email) {
      return {
        error: "Email is Missing",
      };
    }

    const user = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, email));

    if (!user) {
      return {
        error: "User not found",
      };
    }

    if (user[0].emailverify === true) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log("Unable to Find Verified User ", error.message);
  }
}
