"use server";

import { getAdminKeys } from "./getAdminKeys";

interface getCheckUsageProps {
  orderId?: string;
}
export const getCheckUsage = async (options: getCheckUsageProps = {}) => {
  try {
    const adminKeys: any = await getAdminKeys();
    const { orderId } = options;

    let url = `https://api.mobimatter.com/mobimatter/api/v2/provider/usage/${orderId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accpet: "text/plain",
        // "api-key": "104883b5fe984321a2ba68470504b267",
        "api-key": adminKeys[0]?.apikey as string,
        // MerchantId: "6d58aede-871a-4556-83f0-9b0e0c31602f",
        MerchantId: adminKeys[0]?.merchantid as string,
      },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    // throw new Error(`Unable to fetch Order Usage data!`);
    console.log("Unable to fetch Order Usage data", error.message);
  }
};
