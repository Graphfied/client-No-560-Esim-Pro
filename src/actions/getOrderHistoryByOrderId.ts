"use server";
import { db, orders } from "../lib/drizzle";
import { eq } from "drizzle-orm";

export async function getOrderHistoryByOrderId(orderId: string) {
  try {
    // get order history data for Admin Panel
    const data = await db
      .select()
      .from(orders)
      .where(eq(orders.orderid, orderId));

    return data;
  } catch (error: any) {
    // throw new Error("Unable to Fetch order History For Order Page");
    console.log("Unable to Fetch order History For Order Page", error.message);
  }
}
