"use server";

export const getProviderDetails = async () => {
  try {
    let url = "https://api.mobimatter.com/mobimatter/api/v2/products";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accpet: "text/plain",
        "api-key": "104883b5fe984321a2ba68470504b267",
        MerchantId: "6d58aede-871a-4556-83f0-9b0e0c31602f",
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
