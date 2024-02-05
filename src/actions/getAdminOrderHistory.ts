"use server";
import { db, orders } from "../lib/drizzle";

export async function getAdminOrderHistory() {
  try {
    // get order history data for Admin Panel
    const data = await db.select().from(orders);

    return data;
  } catch (error: any) {
    // throw new Error("Unable to Fetch order History For Admin Panel!");
    console.log(
      "Unable to Fetch order History For Admin Panel!",
      error.message
    );
  }
}
