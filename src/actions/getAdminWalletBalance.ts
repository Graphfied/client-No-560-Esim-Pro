"use server";

import { getAdminKeys } from "./getAdminKeys";

export async function getAdminWalletBalance() {
  try {
    const adminKeys: any = await getAdminKeys();

    let url = `https://api.mobimatter.com/mobimatter/api/v2/merchant/balance`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // "api-key": process.env.MOBI_API_KEY as string,
        "api-key": adminKeys[0]?.apikey as string,
        // MerchantId: process.env.MOBI_MERCHANT_ID as string,
        MerchantId: adminKeys[0]?.merchantid as string,
      },
      cache: "no-store",
    });
    const data: any = response.json();
    return data;
  } catch (error: any) {
    // throw new Error("Error in getAdminWalletBalance");
    console.log("Error in getAdminWalletBalance", error.message);
  }
}
