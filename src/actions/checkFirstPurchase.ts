"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser";
import setReferenceCodeOnEmail from "./setReferenceCodeonEmail";
import setRewardBalanceOnRefCode from "./setRewardBalanceOnRefCode";

interface checkFirstPurchaseProps {
  referencecode?: string;
}

export const checkFirstPurchase = async (
  options: checkFirstPurchaseProps = {}
) => {
  const { referencecode } = options;

  try {
    const currentUser: any = await getCurrentUser();
    // if there is not a current user, return an error

    if (!currentUser) {
      throw new Error("User not found , Order will not created !");
    }

    // const data = await db.select().from(orders);
    // console.log(options);
    const res = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, currentUser.email));
    if (res[0].firstpurchase === false) {
      await db
        .update(mobiusers)
        .set({
          firstpurchase: true,
        })
        .where(eq(mobiusers.email, currentUser.email))
        .returning();
      setReferenceCodeOnEmail({ email: res[0].email! });

      if (referencecode) {
        setRewardBalanceOnRefCode({
          referencecode: referencecode,
          rewardbalance: 5,
        });
      }
    }

    return res;
  } catch (error: any) {
    console.log("Error in setting Reference Code", error.message);
    // throw new Error("Error in setting reference code");
  }
};
