"use server";

import { db, rewardhistory } from "@/lib/drizzle";
import getCurrentUser from "./getCurrentUser";
import { revalidatePath } from "next/cache";

interface AddRewardInTableProps {
  type?: "Added" | "Deducted";
  amount?: string;
  datetime?: string;
  email?: string;
}

export async function AddRewardInTable(
  rewardOptions: AddRewardInTableProps
): Promise<any> {
  try {
    const { type, amount, datetime, email } = rewardOptions;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Not Authorized");
    }

    const userRewardHistory = await db
      .insert(rewardhistory)
      .values({
        datetime,
        type,
        amount,
        email,
      })
      .returning();

    // console.log("Added Reward in Reward History ----> ", userRewardHistory);
    revalidatePath(`/admin/users`);

    return userRewardHistory;
  } catch (error: any) {
    // Throw a meaningful error message
    // throw new Error(`Error in AddRewardInTable: ${error.message}`);
    console.log("Error in AddRewardTable ", error.message);
  }
}
