"use server";

import { getAdminKeys } from "./getAdminKeys";

// Complete Order Api will be Added Here,
interface CompleteOrderFromMobiProps {
  orderId?: string;
  requiredFields?: {
    name: string;
    value: string;
  };
  notes?: string;
}

export async function CompleteOrderFromMobi(
  options: CompleteOrderFromMobiProps = {}
) {
  try {
    // console.log("Complete Order From MobiMatter");
    const adminKeys: any = await getAdminKeys();

    const { orderId, requiredFields, notes } = options;
    let url = ` https://api.mobimatter.com/mobimatter/api/v2/order/complete`;

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
        requiredFields: {
          name: requiredFields?.name,
          value: requiredFields?.value,
        },
        notes: notes,
      }),
    });

    const data = await response.json();
    // console.log("data", data);
    return data.result;
  } catch (error: any) {
    console.log("Error in Completing Order from MobiMatter", error.message);
    // throw new Error("Error in Completing Order from MobiMatter");
  }
}
