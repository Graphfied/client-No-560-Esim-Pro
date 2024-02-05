"use server";

import { getAdminKeys } from "./getAdminKeys";

interface CancelOrderFromMobiProps {
  orderId?: string;
  reason?: string;
}

export async function CancelOrderFromMobi(
  options: CancelOrderFromMobiProps = {}
) {
  try {
    const adminKeys: any = await getAdminKeys();

    const { orderId, reason } = options;
    let url = `
        https://api.mobimatter.com/mobimatter/api/v2/order/cancel`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // "api-key": process.env.MOBI_API_KEY as string,
        "api-key": adminKeys[0]?.apikey as string,
        // MerchantId: process.env.MOBI_MERCHANT_ID as string,
        MerchantId: adminKeys[0]?.merchantid as string,
      },
      body: JSON.stringify({
        orderId: orderId,
        reason: reason,
      }),
    });

    const data = await response.json();
    // console.log("Inside Cancel Order: ", data);
    return data;
  } catch (error: any) {
    console.log("Error in Cancel Order From Mobi ", error.message);
    // throw new Error("Unable to Cancel Order From Mobi.");
  }
}
