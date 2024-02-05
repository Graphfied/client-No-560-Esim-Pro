"use server";

import { revalidatePath } from "next/cache";
import { db, orders, rewardhistory } from "../lib/drizzle";

export async function DeleteAdminOrderHistory() {
  try {
    const result = await db.delete(orders).returning().execute();
    revalidatePath("/admin/orderhistory");
    // console.log("Order history deleted", result);
    return result;
  } catch (error: any) {
    console.log("Error in deleting order history", error.message);
    // throw new Error("Error in deleting order history");
  }
}
