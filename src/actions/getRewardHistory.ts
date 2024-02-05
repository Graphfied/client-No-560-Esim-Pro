"use server";
import { db, rewardhistory } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser";
import { User } from "@/components/navbar";

export async function getRewardHistoryByEmail(email: string) {
  try {
    const currentUser: User = await getCurrentUser();
    // get order history data for Admin Panel
    const data = await db
      .select()
      .from(rewardhistory)
      .where(eq(rewardhistory.email, email));

    return data;
  } catch (error: any) {
    // throw new Error("Unable to Fetch order History For Order Page");
    console.log("Unable to Fetch order History For Order Page", error.message);
  }
}
