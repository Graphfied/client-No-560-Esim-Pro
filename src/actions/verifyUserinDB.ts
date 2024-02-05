"use server";

import { db, mobiusers } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

interface VerifyUserInDatabaseProps {
  token?: string;
}

export async function VerifyUserInDatabase(
  options: VerifyUserInDatabaseProps = {}
) {
  try {
    const { token } = options;

    if (!token) {
      return {
        error: "Token is Missing",
      };
    }

    const user = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.verifytoken, token));

    if (!user) {
      return {
        error: "Invalid Token",
      };
    }

    let updateUser;

    if (user) {
      updateUser = await db
        .update(mobiusers)
        .set({
          emailverify: true,
          verifytoken: "",
          verifytokenexpiry: null,
        })
        .where(eq(mobiusers.userid, user[0].userid))
        .returning();
    }

    return updateUser;
  } catch (error: any) {
    console.log("Unable to Verify the User in Database ", error.message);
  }
}
