"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";

interface setRewardBalanceProps {
  userid?: number;
  rewardamount?: number;
}

export default async function setRewardBalance(
  props: setRewardBalanceProps = {}
) {
  try {
    if (!props.userid || !props.rewardamount) {
      return null;
    }
    const rewarddata = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.userid, props.userid));

    if (!rewarddata[0].rewardbalance) {
      return null;
    }
    // console.log(
    //   Number(rewarddata[0].rewardbalance) + Number(props.rewardamount)
    // );
    const data = await db
      .update(mobiusers)
      .set({
        rewardbalance: (
          Number(rewarddata[0].rewardbalance) + Number(props.rewardamount)
        ).toString(),
      })
      .where(eq(mobiusers.userid, props.userid))
      .returning();

    return data;
  } catch (error: any) {
    // return null;
    console.log("Error in setRewardBalance: ", error.message);
  }
}
