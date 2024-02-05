"use server";
import { db, mobiusers } from "@/lib/drizzle";
import getCurrentUser from "./getCurrentUser";
import { eq } from "drizzle-orm";

export async function DeductBalanceFromUserWallet(balance: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const userWallet = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, currentUser.email));

    if (!userWallet || userWallet.length === 0) {
      throw new Error("User wallet not found");
    }

    const currentBalance = userWallet[0]?.rewardbalance || "0";
    const newBalance = (
      parseFloat(currentBalance) - parseFloat(balance)
    ).toFixed(2);

    // Update the user's balance in the database
    await db
      .update(mobiusers)
      .set({ rewardbalance: newBalance })
      .where(eq(mobiusers.email, currentUser.email));

    // console.log(
    //   `Successfully deducted ${balance} from user's wallet. New balance: ${newBalance}`
    // );
  } catch (error: any) {
    console.error("Error deducting balance from user's wallet:", error.message);
    // throw new Error("Error deducting balance from user's wallet");
  }
}
