"use server";

import { db, mobiusers } from "@/lib/drizzle";
import getCurrentUser from "./getCurrentUser";
import { eq } from "drizzle-orm";

export async function AddCashBackBonus(bonus: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const userRewardBalance = parseFloat(currentUser?.rewardbalance || "0");
    const newBonus = (userRewardBalance + parseFloat(bonus)).toString();
    // console.log(" Total Bonus ---- > ", newBonus);

    const addBonus = await db
      .update(mobiusers)
      .set({
        rewardbalance: newBonus,
      })
      .where(eq(mobiusers.userid, currentUser.userid));

    return addBonus;
  } catch (error: any) {
    // throw new Error("Error adding cashback bonus");
    console.log("Error adding cashback bonus ", error.message);
  }
}
