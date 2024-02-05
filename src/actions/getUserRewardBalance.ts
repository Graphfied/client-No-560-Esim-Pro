"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";

export async function getUserRewardBalance(email: string) {
  try {
    // get order history data for Admin Panel
    const data = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, email));

    // Extract rewardbalance property or default to 0 if data is empty
    const rewardBalance = data.length > 0 ? data[0].rewardbalance : 0;
    // console.log("INside gerusereward balace", rewardBalance);
    return rewardBalance;
  } catch (error: any) {
    console.log("Error Fetching User Reward Balance", error.message);
    // throw new Error("Unable to Fetch order History For Order Page");
  }
}
