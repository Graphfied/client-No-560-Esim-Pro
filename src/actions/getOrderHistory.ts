"use server";

import { db, orders } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser";

export const getOrderHistory = async () => {
  try {
    const currentUser = await getCurrentUser();
    const currentUserid: any = currentUser?.userid;
    const data = await db
      .select()
      .from(orders)
      .where(eq(orders.userid, currentUserid));

    return data;
  } catch (error: any) {
    // throw new Error("Error in getting data");
    console.log("Error in getting data", error.message);
  }
};
