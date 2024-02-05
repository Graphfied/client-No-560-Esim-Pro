"use client";

import { CheckReferralCodeExists } from "@/actions/checkRefferalCodeExists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export const PromoSection = () => {
  const [inputValue, setinputValue] = useState("");
  const [validCode, setvalidCode] = useState();

  // console.log("Valid Code --->", validCode);

  const handleApplyButtonClick = async () => {
    const res = await CheckReferralCodeExists(inputValue);
    // Add any additional logic you want to perform on button click
    // console.log("Checked Inside Promo Section ----> ", res);
    setvalidCode(res! as any);
    return res;
  };

  return (
    <>
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
        <>
          <p className=" text-emerald-600 ml-2">Valid Code</p>
        </>
      )}
      {validCode === false && (
        <>
          <p className=" text-red-600 ml-2">Invalid Code</p>
        </>
      )}
    </>
  );
};
