"use server";

import { db, orders } from "../lib/drizzle";
import { eq } from "drizzle-orm";

interface UpdateOrderState {
  orderId?: string;
  state?: "Created" | "Completed" | "Expired" | "Cancelled" | "Processing";
}
export async function UpdateOrderState(options: UpdateOrderState = {}) {
  try {
    const { orderId, state } = options;
    const updateState = await db
      .update(orders)
      .set({
        orderstate: state,
      })
      .where(eq(orders.orderid, orderId as string))
      .returning();

    return updateState;
  } catch (error: any) {
    // throw new Error(" Unable to update the order state ");
    console.log(" Unable to update the order state ", error.message);
  }
}
