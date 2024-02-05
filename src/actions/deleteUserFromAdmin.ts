"use server";
import { revalidatePath } from "next/cache";
import { db, mobiusers } from "../lib/drizzle";
import { and, eq } from "drizzle-orm";

export async function DeleteUserFromDB(email: string) {
  try {
    const deleteUserFromDB = await db
      .delete(mobiusers)
      .where(and(eq(mobiusers.email, email)))
      .returning();

    revalidatePath("/admin/users");
    return deleteUserFromDB;
  } catch (error: any) {
    console.log("Error in Deleting User from Mobiuser Table", error.message);
    // throw new Error("Error in Deleting User from Mobiuser Table");
  }
}
