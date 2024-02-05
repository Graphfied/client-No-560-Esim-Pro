"use server";

import { db, mobiusers } from "@/lib/drizzle";
import getCurrentUser from "./getCurrentUser";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdateRewardBalanceOfUserProps {
  email?: string;
  updateBalance?: string;
}

export async function UpdateRewardBalanceOfUser(
  options: UpdateRewardBalanceOfUserProps = {}
) {
  try {
    const { email, updateBalance } = options;
    // console.log("🚀 ~ options:", options);

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const getUserFromEmail = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, email!));
    // console.log("getUserFromEmail --->", getUserFromEmail);

    // const updateRewardBalance =
    //   Number(getUserFromEmail[0].rewardbalance) + Number(updateBalance);

    // console.log("Update Balance inside ---> ", updateRewardBalance);

    const updateUserRewardBalance = await db
      .update(mobiusers)
      .set({ rewardbalance: updateBalance?.toString() })
      .where(eq(mobiusers.email, email!))
      .returning();
    // console.log("Update Reward Inside- --> ", updateUserRewardBalance);

    revalidatePath(`/admin/users`);
    return updateUserRewardBalance;
  } catch (error: any) {
    console.log("Error in updating reward balance of user", error.message);
    // throw new Error("Error in updating reward balance of user");
  }
}
