"use server";

import { db, dashboardconfig } from "../lib/drizzle";

export async function getAdminRewards() {
  try {
    // Check if the dashboardconfig table is empty
    const firstRecord = await db.select().from(dashboardconfig).limit(1);

    if (firstRecord.length === 0) {
      // If the table is empty, insert the record
      const rewardsPercentage = await db
        .insert(dashboardconfig)
        .values({
          id: Number(1).toString(),
          reward: Number(0).toString(),
          cashbackpercent: Number(10).toString(),
          discountpercent: Number(3).toString(),
        })
        .returning();

      return rewardsPercentage;
    } else {
      // If the table is not empty, retrieve the existing records
      const getRewardPercentage = await db.select().from(dashboardconfig);
      return getRewardPercentage;
    }
  } catch (error: any) {
    console.log(
      "Unable to insert or / update the Rewards Percentage",
      error.message
    );

    // throw new Error("Unable to insert or / update the Rewards Percentage");
  }
}
