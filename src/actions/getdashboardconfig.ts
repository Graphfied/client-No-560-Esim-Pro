"use server";
import { dashboardconfig, db } from "../lib/drizzle";

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
  // userid ?: number;
  email?: string;
}

export default async function getMobiUser(props: getMobiUserProps = {}) {
  try {
    if (!props.email) {
      return null;
    }
    const dashboarddata = await db.select().from(dashboardconfig);
    // console.log(dashboarddata, "dashboarddatar");
    return dashboarddata;
  } catch (error: any) {
    // return null;
    console.log("Error in getting dashboard error", error.message);
  }
}
