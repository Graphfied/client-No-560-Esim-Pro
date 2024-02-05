"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";

interface setRewardBalanceOnEmailProps {
  email?: string;
  rewardbalance?: number;
}

export default async function setRewardBalanceOnEmail(
  props: setRewardBalanceOnEmailProps = {}
) {
  try {
    if (!props.email || !props.rewardbalance) {
      return null;
    }
    const rewarddata = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, props.email));

    if (!rewarddata[0].rewardbalance) {
      return null;
    }
    // console.log(
    //   " Set Reward Balance on Email",Number(rewarddata[0].rewardbalance) + Number(props.rewardamount)
    // );
    // console.log(
    //   " Set Reward Balance on Email",
    //   Number(rewarddata[0].rewardbalance)
    // );
    const data = await db
      .update(mobiusers)
      .set({
        rewardbalance: (
          Number(rewarddata[0].rewardbalance) + Number(props.rewardbalance)
        ).toString(),
      })
      .where(eq(mobiusers.email, props.email))
      .returning();
    // console.log(userdb, "mobiuser from db")

    return data;
  } catch (error: any) {
    // return null;
    console.log("Error in setting reward balance on email", error.message);
  }
}
