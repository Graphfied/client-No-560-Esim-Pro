"use client";

import { IProductsProps } from "@/app/(main)/esim/[search]/page";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface RewardSelectProps {
  data: IProductsProps;
  rewardsPercentage: {
    id?: string;
    reward?: string;
    cashbackpercent?: string;
    discountpercent?: string;
  };
  orderid: string;
}

export const RewardSelect = ({
  data,
  rewardsPercentage,
  orderid,
}: RewardSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discountPriceUrl = searchParams.get("price");
  const cashBackUrl = searchParams.get("cashback");
  const price = data?.retailPrice;

  const cashback_percentage_backend = parseFloat(
    rewardsPercentage?.cashbackpercent!
  ).toString();
  const discount_percentage_backend = parseFloat(
    rewardsPercentage?.discountpercent!
  ).toString();
  // make a logic on 10 % cashback
  // const calculateCashback = (price: number): number => {
  //   // Calculate 10% of the price for cashback
  //   const cashbackPercentage = 0.1; // 10%
  //   return price * cashbackPercentage;
  // };
  const calculateCashback = (
    price: number,
    cashbackPercentage: number
  ): number => {
    // Calculate the cashback based on the provided percentage
    return price * (cashbackPercentage / 100);
  };

  // make a discount Logic Function
  const calculateDiscount = (
    price: number,
    discountPercentage: number
  ): number => {
    // Calculate the discounted price
    const discountAmount = price * (discountPercentage / 100);
    return price - discountAmount;
  };

  // cashback Amount
  const cashbackAmount = calculateCashback(
    price,
    cashback_percentage_backend as any
  );

  // discount Amount
  const discountAmount = calculateDiscount(
    price,
    discount_percentage_backend as any
  );
  // console.log("🚀 ~ RewardSelect ~ discountAmount:", discountAmount);
  return (
    <>
      {/* heading */}
      <div className="">
        <h1 className="  text-lg mb-2">Or choose your reward</h1>
        <p className=" text-xs">
          Get free eSIMs and top-ups with reward credits! Just collect $15 in
          rewards and make sure you have enough cover the cost of the product.
        </p>
      </div>

      {/* Referral Cards */}
      <div className="flex flex-col min-[711px]:flex-row items-center justify-between gap-x-3 gap-y-5 mt-4">
        {/* First Card */}
        <button
          onClick={() =>
            router.replace(`/checkout?id=${data?.productId}&orderId=${orderid}`)
          }
          className={` bg-white p-6 shadow-md rounded-md w-full min-[711px]:max-w-[33.3%] text-center border-sky-700 border-2 hover:cursor-pointer ${
            cashBackUrl && " border-none"
          } ${discountPriceUrl && "border-none"}`}
        >
          <h3 className=" text-xl font-medium">Referral Bonus</h3>
          <p className=" mt-1">
            $5.00 Rewards credit for both you and your referrer! Valid for your
            first purchase only.
          </p>
        </button>
        {/* Second Card */}
        <button
          onClick={() =>
            router.replace(
              `/checkout?id=${
                data?.productId
              }&orderId=${orderid}&cashback=${cashbackAmount.toFixed(2)}`
            )
          }
          className={` bg-white p-6 shadow-md rounded-md w-full min-[711px]:max-w-[33.3%] text-center focus-visible:border-sky-700 focus-within:border-sky-700  focus:border-2 hover:cursor-pointer 
         ${cashBackUrl ? "  border-sky-800 border-2" : ""}`}
        >
          <h3 className=" text-xl font-medium">
            {cashback_percentage_backend}% Cashback
          </h3>
          <p className=" mt-1">
            You will receive ${cashbackAmount.toFixed(2)} in cashback to your
            Rewards Balance for future use
          </p>
        </button>
        {/* Third Card */}
        {/* <div
          onClick={() => router.replace(`/checkout?id=${data.productId}&price=discountprice`)}
          className=" bg-white p-6 shadow-md rounded-md w-full min-[711px]:max-w-[33.3%] text-center focus-visible:border-sky-700 focus-within:border-sky-700 focus-within:border-2 focus:border hover:cursor-pointer "
        >
          <h3 className=" text-xl font-medium">3% Discount</h3>
          <p className=" mt-1">
            You will receive 3% immediate discount, making the new order total
            $12.60
          </p>
        </div> */}
        <button
          onClick={() =>
            router.replace(
              `/checkout?id=${data?.productId}&orderId=${orderid}&price=${data?.retailPrice}`
            )
          }
          className={`bg-white p-6 shadow-md rounded-md w-full min-[711px]:max-w-[33.3%] text-center focus-visible:border-sky-700 focus-within:border-sky-700  focus:border-2 hover:cursor-pointer ${
            discountPriceUrl ? "  border-sky-800 border-2" : ""
          } `}
        >
          <h3 className="text-xl font-medium">
            {discount_percentage_backend}% Discount
          </h3>
          <p className="mt-1">
            You will receive {discount_percentage_backend}% immediate discount,
            making the new order total ${discountAmount.toFixed(2)}
          </p>
        </button>
      </div>
    </>
  );
};
