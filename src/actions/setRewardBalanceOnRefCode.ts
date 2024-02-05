"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser";

interface setRewardBalanceOnRefCodeProps {
  referencecode?: string;
  rewardbalance?: number;
}

export default async function setRewardBalanceOnRefCode(
  props: setRewardBalanceOnRefCodeProps = {}
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const res = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, currentUser.email));

    const updatedRewardBalance =
      Number(res[0].rewardbalance) + Number(props.rewardbalance);

    const check = await db
      .update(mobiusers)
      .set({ rewardbalance: updatedRewardBalance.toString() })
      .where(eq(mobiusers.email, res[0].email!))
      .returning(); // Specify the column to return

    //
    const getReferralCodeUser = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.referencecode, props.referencecode!));

    // add reward in ReferralCodeUser also
    const updatedRewardOfReferralCode =
      Number(getReferralCodeUser[0].rewardbalance) +
      Number(props.rewardbalance);
    const rewardBalanceReferralCode = await db
      .update(mobiusers)
      .set({ rewardbalance: updatedRewardOfReferralCode.toString() })
      .where(eq(mobiusers.email, getReferralCodeUser[0].email!))
      .returning();

    // console.log("Both User Got Reward ----> ", {
    //   check,
    //   rewardBalanceReferralCode,
    // });

    return { check, rewardBalanceReferralCode };
  } catch (error: any) {
    console.log("Error in setting reward balance on Ref Code ", error.message);
    // throw new Error("Error in setting reward balance on Ref Code ");
  }
}
