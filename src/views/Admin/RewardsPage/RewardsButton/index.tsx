"use client";
import { UpdateAdminRewardsPercent } from "@/actions/updateAdminRewardsPercent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export const RewardsButton = ({
  data,
}: {
  data: {
    id?: string;
    reward?: string;
    cashbackpercent?: string;
    discountpercent?: string;
  };
}) => {
  const [cashbackPercent, setcashbackPercent] = useState("");
  const [discountPercent, setdiscountPercent] = useState("");
  const [isCashLoading, setisCashLoading] = useState(false);
  const [isDiscountLoading, setisDiscountLoading] = useState(false);

  // console.log("CashBack Entered ---> ", cashbackPercent);
  // console.log("Discount Entered ----> ", discountPercent);

  // Update the Cashback Percentage
  const submitCashbackPercent = async () => {
    setisCashLoading(true);
    try {
      const response = await UpdateAdminRewardsPercent({
        cashback: cashbackPercent,
      });

      return response;
    } catch (error) {
      console.log("Error in Updating the Cashback --->", error);
    } finally {
      setisCashLoading(false);
    }
  };

  // Update the Discount Percentage
  const submitDiscountPercent = async () => {
    setisDiscountLoading(true);
    try {
      const response = await UpdateAdminRewardsPercent({
        discount: discountPercent,
      });
      return response;
    } catch (error) {
      console.log("Error in Updating the Discount --->", error);
    } finally {
      setisDiscountLoading(false);
    }
  };

  return (
    <div className=" my-5">
      <div className=" flex flex-col w-full md:max-w-[40%]  gap-10 ">
        {/* CashBack Button */}

        <div className=" flex flex-col ">
          <p className="font-medium">Add Cashback Percentage </p>
          <p>
            Current Cashback Percentage :{" "}
            {parseFloat(data?.cashbackpercent!).toString()}%{" "}
          </p>
          <div className=" flex items-center  mt-3">
            <Input
              placeholder="Add Cashback Percentage"
              className="focus-visible:border focus-visible:border-darkblue focus-visible:ring-0 focus-visible:ring-offset-0  "
              value={cashbackPercent}
              onChange={(e) => setcashbackPercent(e.target.value)}
            />
            <Button
              onClick={submitCashbackPercent}
              disabled={isCashLoading}
              className="text-xs md:text-sm lg:text-base h-8
           p-2 md:p-1 lg:px-3 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]  text-white"
            >
              Update
            </Button>
          </div>
        </div>

        {/* Discount Button */}
        <div className=" flex flex-col">
          <p className="font-medium">Add Discount Percentage </p>
          <p>
            Current Discount Percentage :{" "}
            {parseFloat(data?.discountpercent!).toString()}%{" "}
          </p>
          <div className="flex items-center  mt-3">
            <Input
              placeholder="Add Cashback Percentage"
              className="focus-visible:border focus-visible:border-darkblue focus-visible:ring-0 focus-visible:ring-offset-0  "
              value={discountPercent}
              onChange={(e) => setdiscountPercent(e.target.value)}
            />
            <Button
              onClick={submitDiscountPercent}
              disabled={isDiscountLoading}
              className="text-xs md:text-sm lg:text-base h-8 
           p-2 md:p-1 lg:px-3 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]  text-white"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
