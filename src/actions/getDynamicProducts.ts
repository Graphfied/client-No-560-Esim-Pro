"use server";

import { getAdminKeys } from "./getAdminKeys";

export interface DynamicProductsOptions {
  region?: string;
  country?: string;
  productId?: string;
  category?: string;
  provider?: string;
}

export const getDynamicProducts = async (
  options: DynamicProductsOptions = {}
) => {
  try {
    const adminKeys: any = await getAdminKeys();

    let url = "https://api.mobimatter.com/mobimatter/api/v2/products";

    const { region, country, productId, category, provider } = options;

    if (region && category && country) {
      url += `?region=${region}&category=${category}&country=${country}`;
    } else if (region && category) {
      url += `?region=${region}&category=${category}`;
    } else if (region && country) {
      url += `?region=${region}&country=${country}`;
    } else if (country && provider && category) {
      url += `?country=${country}&provider=${provider}&category=${category}`;
    } else if (region) {
      url += `?region=${region}`;
    } else if (country && category) {
      url += `?country=${country}&category=${category}`;
    } else if (country) {
      url += `?country=${country}`;
    } else if (productId) {
      url += `?productId=${productId}`;
    } else if (category) {
      url += `?category=${category}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accpet: "text/plain",
        // "api-key": process.env.MOBI_API_KEY as string,
        "api-key": adminKeys[0]?.apikey! as string,
        // MerchantId: process.env.MOBI_MERCHANT_ID as string,
        MerchantId: adminKeys[0].merchantid as string,
      },
    });
    const data = await res.json();

    return data.result;
  } catch (error: any) {
    // throw new Error("Unable get products by specific region and country code");
    console.log(
      "Unable get products by specific region and country code",
      error.message
    );
  }
};
