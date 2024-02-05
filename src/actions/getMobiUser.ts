"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";

export interface MobiUser {
  userid?: number | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  rewardbalance?: number;
  referencecode?: string | null;
  firstpurchase?: boolean | null;
}

interface getMobiUserProps {
  userid?: number;
  email?: string;
}

export default async function getMobiUser(props: getMobiUserProps = {}) {
  try {
    if (!props.email) {
      return null;
    }
    const mobiusertemp = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, props.email));
    const mobiuser: any = mobiusertemp[0];

    return mobiuser;
  } catch (error: any) {
    // return null;
    console.log("Error in MobiUser --> ", error.message);
  }
}
