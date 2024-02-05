"use client";

import useToggle from "@/utils/toggleButtonState";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { SelectBox } from "../TopupSelect/SelectBox";
import { ALLTopUpSearchSelector } from "./All-Page-Selector";

interface TopupAllPageProps {
  optionData: any;
  providers: { logo: string; label: string; value: string }[];
  providerName: string;
}
export const TopUpAllSelect = ({
  optionData,
  providers,
  providerName,
}: TopupAllPageProps) => {
  const { selectedButton, setSelectedButton } = useToggle();
  const [providername, setProvidername] = useState("");
  // console.log("🚀 ~ file: index.tsx:20 ~ TopupSelect ~ providername:", providername)

  const handleSelectValue = (value: string) => {
    setProvidername(value);
  };
  return (
    <div className=" flex items-center gap-x-3 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-8 xl:mx-0 3xl:mx-8">
      {selectedButton === "Country" && (
        <>
          {/* Main Topup Page Selector */}
          <ALLTopUpSearchSelector
            onSelect={handleSelectValue}
            data={providers}
            className=" bg-white text-gray-500 h-[64px] w-96 shadow-md"
            placeholder="Select Provider Name"
          />
          <div className=" flex items-center mx-auto">
            <SelectBox
              countries={optionData}
              className=" w-[55dvw] bg-white text-gray-500 shadow-md"
              provider={providerName}
              baseUrl={``}
            />
            <div className="absolute right-1  sm:-right-3 md:-right-6 lg:-right-3 xl:right-3 2xl:right-3 3xl:right-12 bg-[#38BDEF] rounded-full text-white hover:bg-[#38BDEF] hover:opacity-70 transition duration-500 ease-in-out p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2.5 ml-auto">
              <SearchIcon className="h-5 w-5" />
            </div>
          </div>
        </>
      )}
      {selectedButton === "Order#" && (
        <div className=" relative flex items-center mx-2 w-full">
          <Input
            placeholder="Enter your Order Id ex: MM-123456"
            className="bg-white text-gray-500 h-[64px] w-full shadow-md focus-visible:ring-0 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-0 border-none"
          />
          <div className=" absolute right-3 bg-[#38BDEF] rounded-full text-white hover:bg-[#38BDEF] hover:opacity-70 transition duration-500 ease-in-out p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2.5 ml-auto">
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
};
