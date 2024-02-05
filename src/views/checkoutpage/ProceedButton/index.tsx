"use client";

// import { IProductsProps } from "@/app/(main)/esim/[search]/page";
import { User } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/utils/AbsoluteUrl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { PromoSection } from "../PromoSection";
import Link from "next/link";
import { CheckReferralCodeExists } from "@/actions/checkRefferalCodeExists";
import { Input } from "@/components/ui/input";
import { getOrderHistoryByOrderId } from "@/actions/getOrderHistoryByOrderId";
import { UpdateOrderState } from "@/actions/updateOrderState";

export const ProceedButton = ({
  data,
  currentUser,
  createdOrderId,
  discountPercentage,
}: {
  data: any;
  currentUser: User;
  createdOrderId: string;
  discountPercentage?: string;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const orderIDParams = searchParams.get("orderId");
  const cashBackBonus = searchParams.get("cashback");
  const balanceParams = searchParams.get("balance");
  // console.log("🚀 ~ balanceParams:", balanceParams);

  let productId = data?.productId;

  const [inputValue, setinputValue] = useState("");
  const [validCode, setvalidCode] = useState();
  const [error, seterror] = useState("");

  useEffect(() => {
    // Clear the error state whenever the URL updates
    seterror("");
  }, [searchParams]);
  // searchParams.has("id") && searchParams.has("orderId")

  let price: any;
  price = Math.round(Number(data?.retailPrice) * 100);

  // console.log("Has ====> ", searchParams.has("price"));

  // if (searchParams.has("price") === true) {
  //   // make a discount Logic Function
  //   // console.log("Inside If ---->");
  //   let discountedPrice;
  //   const calculateDiscount = (
  //     price: number,
  //     discountPercentage: number
  //   ): number => {
  //     // Calculate the discounted price
  //     const discountAmount = price * (discountPercentage / 100);
  //     return price - discountAmount;
  //   };
  //   discountedPrice = calculateDiscount(
  //     data?.retailPrice,
  //     parseFloat(discountPercentage!)
  //   );
  //   price = Math.round(Number(discountedPrice) * 100);
  //   // console.log("Discount Price ----> ", price);

  //   // Calculate total price after deduction (including balance)
  //   // price = balanceParams
  //   //   ? (
  //   //       parseFloat(
  //   //         data?.retailPrice ? discountedPrice : data[0]?.retailPrice
  //   //       ) - parseFloat(balanceParams!)
  //   //     ).toFixed(2)
  //   //   : data?.retailPrice
  //   //   ? discountedPrice
  //   //   : data[0]?.retailPrice;
  //   // Calculate total price after deduction (including balance)
  //   price = balanceParams
  //     ? (
  //         parseFloat(data?.retailPrice ? discountedPrice : data?.retailPrice) -
  //         parseFloat(balanceParams!)
  //       ).toFixed(2)
  //     : data?.retailPrice
  //     ? discountedPrice
  //     : data?.retailPrice
  //     ? (parseFloat(data?.retailPrice) - parseFloat(balanceParams!)).toFixed(2)
  //     : data?.retailPrice;
  // }

  // if (searchParams.has("price") === true) {
  //   // make a discount Logic Function
  //   let discountedPrice: any;
  //   const calculateDiscount = (
  //     price: number,
  //     discountPercentage: number
  //   ): number => {
  //     // Calculate the discounted price
  //     const discountAmount = price * (discountPercentage / 100);
  //     return price - discountAmount;
  //   };

  //   discountedPrice = calculateDiscount(
  //     data?.retailPrice,
  //     parseFloat(discountPercentage!)
  //   );

  //   price = balanceParams
  //     ? (parseFloat(discountedPrice!) - parseFloat(balanceParams!)).toFixed(2)
  //     : discountedPrice;
  // } else {
  //   price = balanceParams
  //     ? (parseFloat(data?.retailPrice) - parseFloat(balanceParams!)).toFixed(2)
  //     : data?.retailPrice;
  // }

  if (searchParams.has("price")) {
    // Discount logic function
    const calculateDiscount = (
      price: number,
      discountPercentage: number
    ): number => {
      const discountAmount = price * (discountPercentage / 100);
      return price - discountAmount;
    };

    // Calculate discounted price
    const discountedPrice: any = calculateDiscount(
      data?.retailPrice,
      parseFloat(discountPercentage!)
    );

    // Update price with or without balance deduction
    price = balanceParams
      ? parseFloat(balanceParams) >= parseFloat(discountedPrice!)
        ? data?.retailPrice // Set to zero or handle it accordingly
        : (parseFloat(discountedPrice!) - parseFloat(balanceParams)).toFixed(2)
      : discountedPrice;
  } else {
    // Update price with or without balance deduction
    price = balanceParams
      ? parseFloat(balanceParams) >= parseFloat(data?.retailPrice)
        ? data?.retailPrice // Set to zero or handle it accordingly
        : (parseFloat(data?.retailPrice) - parseFloat(balanceParams)).toFixed(2)
      : data?.retailPrice;
  }
  price = Math.round(Number(price) * 100);
  // console.log("Price --->", price);
  const sendPrice = price / 100;
  let successUrl = absoluteUrl(
    `/order?orderid=${orderIDParams}&price=${sendPrice}`
  );
  if (validCode === true) {
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&validCode=${inputValue}&price=${sendPrice}`
    );
  } else if (validCode === true && balanceParams) {
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&validCode=${inputValue}&balance=${balanceParams}&price=${sendPrice}`
    );
  } else if (cashBackBonus && balanceParams) {
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&cashback=${cashBackBonus}&balance=${balanceParams}&price=${sendPrice}`
    );
  } else if (cashBackBonus) {
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&cashback=${cashBackBonus}&price=${sendPrice}`
    );
  } else if (balanceParams) {
    // Add this block for the case when balanceParams is present
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&balance=${balanceParams}&price=${sendPrice}`
    );
  } else {
    successUrl = absoluteUrl(
      `/order?orderid=${orderIDParams}&price=${sendPrice}`
    );
  }
  let CancelUrl = absoluteUrl(
    `/checkout?id=${productId}&orderid=${orderIDParams}`
  );

  const handleCheckOut = async () => {
    try {
      if (!currentUser) {
        router.push("/login");
      }

      await UpdateOrderState({
        orderId: orderIDParams!,
        state: "Processing",
      });

      const specificOrderId: any = await getOrderHistoryByOrderId(
        orderIDParams!
      );

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: CancelUrl,
        payment_method_types: ["card"],
        mode: "payment",
        billing_address_collection: "auto",
        customer_email: `${currentUser?.email}`,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: `${data?.productDetails?.product_Title}`,
                description: `${data.product_details?.heading}`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          productId,
          productName: specificOrderId[0]?.title,
          productPrice: price,
          // qrCode: qrCode,
          activationInstructions: specificOrderId[0]?.activationinstructions,
          activationCode: specificOrderId[0]?.activationcode,
          smdpAdrress: specificOrderId[0]?.smdpaddress,
        },
      });

      // Redirect the user to the Stripe checkout page
      // window.location.href = stripeSession.url;
      // console.log("Stripe Url", stripeSession.url);
      const dataUrl = router.push(stripeSession.url!);

      return dataUrl;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      // Handle the error as needed
    }
  };

  // console.log("Valid Code --->", validCode);

  // const handleApplyButtonClick = async () => {
  //   // Check if the required parameters are present in the URL
  //   setHasRequiredParams(searchParams.has("id") && searchParams.has("orderId"));

  //   if (!hasRequiredParams) {
  //     // Display an error message or handle the error as needed
  //     console.error("Error: Please select referral bonus first");
  //     // You can also render an error message on the UI if needed
  //     return;
  //   }
  //   const res = await CheckReferralCodeExists(inputValue);
  //   // Add any additional logic you want to perform on button click
  //   // console.log("Checked Inside Promo Section ----> ", res);
  //   setvalidCode(res! as any);
  //   return res;
  // };
  const handleApplyButtonClick = async () => {
    // Check if the required parameters "cashback" or "price" are present in the URL
    if (searchParams.has("cashback") || searchParams.has("price")) {
      seterror("Please select referral bonus first");
    } else {
      // Continue with the referral code check logic
      const res = await CheckReferralCodeExists(inputValue);
      setvalidCode(res! as any);
      seterror(""); // Clear the error message if there are no errors
      return res;
    }
  };

  return (
    <>
      {/* Promo Section */}
      {/* <PromoSection /> */}
      {/* heading */}
      <h1 className="  text-lg mb-2">Do you have a Referral code?</h1>
      <div className=" flex items-center gap-x-3">
        <Input
          placeholder="Enter a Referral Code"
          className=" focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none p-3"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <Button
          onClick={handleApplyButtonClick}
          className=" bg-white border-btnblue border-2 text-btnblue hover:bg-white hover:opacity-70"
        >
          Apply
        </Button>
      </div>
      {validCode === true && (
        <p className="text-emerald-600 ml-2">Valid Code</p>
      )}
      {validCode === false && <p className="text-red-600 ml-2">Invalid Code</p>}
      {error && <p className="text-red-600 mt-2 ml-2">{error}</p>}

      {/* Proceed Button */}
      <div className=" mt-5 mb-3">
        <Link href={"/terms-conditions"}>
          <span className=" text-btnblue underline">Terms and condition</span>{" "}
          apply.
        </Link>
      </div>
      <Button
        onClick={() => handleCheckOut()}
        className="  bg-[#38BDEF] text-lg hover:bg-white hover:text-[#38BDEF] border-2 border-[#38BDEF] text-white p-2 "
      >
        Proceed
      </Button>
    </>
  );
};
