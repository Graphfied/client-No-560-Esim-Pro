"use server";

import getCurrentUser from "./getCurrentUser";
import { and, eq } from "drizzle-orm";
import { db, mobiusers } from "../lib/drizzle";

export async function CheckReferralCodeExists(refferalCode: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    // Check if the referral code exists in the database
    const checkReferralCode = await db
      .select()
      .from(mobiusers)
      .where(
        and(
          eq(mobiusers.referencecode, refferalCode)
          // eq(mobiusers.userid, currentUser.userid)
        )
      );
    // console.log("Inside Check Referral Code ---> ", checkReferralCode);

    // Check if the current user has already used the referral code
    const isUserCheckedPurchase = currentUser.firstpurchase;

    let result = false;

    if (checkReferralCode.length > 0) {
      // Referral code exists in the database

      if (!isUserCheckedPurchase) {
        // If the current user has not checked the purchase
        result = true;
        if (
          checkReferralCode[0]?.referencecode === currentUser?.referencecode
        ) {
          result = false;
        }
      } else {
        // If the current user has already checked the purchase
        result = false;
      }
    }
    // console.log("Result Inside Boolean ----> ", result);

    return result;
  } catch (error: any) {
    // throw new Error("Error in checking referral code");
    console.log("Error in checking referral code", error.message);
  }
}
