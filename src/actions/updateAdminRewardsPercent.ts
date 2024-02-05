"use server";

import { revalidatePath } from "next/cache";
import { db, dashboardconfig } from "../lib/drizzle";
import { eq } from "drizzle-orm";

interface UpdateAdminRewardsPercent {
  cashback?: string;
  discount?: string;
}

export async function UpdateAdminRewardsPercent(
  options: UpdateAdminRewardsPercent = {}
) {
  try {
    const { cashback, discount } = options;
    const updateRewardPercentages = await db
      .update(dashboardconfig)
      .set({
        cashbackpercent: cashback,
        discountpercent: discount,
      })
      .where(eq(dashboardconfig.id, Number(1).toString()))
      .returning();

    revalidatePath(`/admin/rewards`);
    return updateRewardPercentages;
  } catch (error: any) {
    console.log("Error in Updating the Reward Percentage ", error.message);
    // throw new Error("Error in Updating the Reward Percentage ");
  }
}
