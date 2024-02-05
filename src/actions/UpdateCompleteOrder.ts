"use server";

import { db, orders } from "@/lib/drizzle";
import getCurrentUser from "./getCurrentUser";
import { eq, or } from "drizzle-orm";

interface UpdateCompleteOrderInDatabaseProps {
  orderid?: string;
  orderstate?: "Created" | "Completed" | "Expired" | "Cancelled" | "Processing";
  qrcode?: string;
  phone?: string;
  isrefundable?: boolean;
  accesspointname?: string;
  activationcode?: string;
  smdpaddress?: string;
  activationinstructions?: string;
  price?: string;
}

export async function UpdateCompleteOrderInDatabase(
  options: UpdateCompleteOrderInDatabaseProps = {}
) {
  try {
    const {
      orderid,
      orderstate,
      qrcode,
      phone,
      isrefundable,
      accesspointname,
      activationcode,
      smdpaddress,
      activationinstructions,
      price,
    } = options;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not found");
    }

    const updateUser = await db
      .update(orders)
      .set({
        orderid: orderid,
        orderstate: orderstate,
        qrcode: qrcode,
        phone: phone,
        isrefundable: isrefundable,
        accesspointname: accesspointname,
        activationcode: activationcode,
        smdpaddress: smdpaddress,
        activationinstructions: activationinstructions,
        cost: price,
      })
      .where(eq(orders.orderid, orderid as string))
      .returning();

    return updateUser;
  } catch (error: any) {
    console.log(" Unable to Update the Complete Order State ", error.message);
    // throw new Error(" Unableto Update the Complete Order State ");
  }
}
