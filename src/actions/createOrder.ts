"use server";

import { getAdminKeys } from "./getAdminKeys";
import getCurrentUser from "./getCurrentUser";

interface CreateOrderProps {
  productId?: string;
  productCategory?: string;
  addOnOrderIdentifier?: string;
}

export async function CreateOrder(options: CreateOrderProps = {}) {
  try {
    const currentUser = await getCurrentUser();
    const adminKeys: any = await getAdminKeys();
    // console.log("🚀 ~ CreateOrder ~ adminKeys:", adminKeys);

    const { productId, productCategory, addOnOrderIdentifier } = options;
    if (!currentUser) {
      throw new Error("User not found");
    }

    let orderUrl = "https://api.mobimatter.com/mobimatter/api/v2/order";

    const headers: Record<string, string> = {
      "content-type": "application/json",
      // "api-key": process.env.MOBI_API_KEY as string,
      "api-key": adminKeys[0]?.apikey as string,
      // MerchantId: process.env.MOBI_MERCHANT_ID as string,
      MerchantId: adminKeys[0]?.merchantid as string,
    };

    const requestBody: Record<string, string | undefined> = {
      productId: productId,
      productCategory: productCategory,
    };

    if (addOnOrderIdentifier && productCategory === "esim_addon") {
      requestBody.addOnOrderIdentifier = addOnOrderIdentifier;
    }
    // console.log("REQUEST BODY", requestBody);
    const response = await fetch(orderUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("Error in Creating Order", error.message);
    // throw new Error("Unable to Create Order ID.");
  }
}
