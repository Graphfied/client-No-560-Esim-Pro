"use client";

import { useState } from "react";
import useToggle from "@/utils/toggleButtonState";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { SelectBox } from "./SelectBox";
import { MainTopupSelector } from "./MainTopupSelector";

interface TopupSelectProps {
  optionData: any;
  providers: { logo: string; label: string; value: string }[];
}

export const TopupSelect = ({ optionData, providers }: TopupSelectProps) => {
  const { selectedButton, setSelectedButton } = useToggle();
  const [providername, setProvidername] = useState("");

  const handleSelectValue = (value: string) => {
    setProvidername(value);
  };
  return (
    <div className=" flex items-center gap-x-3 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-8 xl:mx-0 3xl:mx-8">
      {selectedButton === "Country" && (
        <>
          {/* Main Topup Page Selector */}

          <MainTopupSelector
            onSelect={handleSelectValue}
            data={providers}
            className=" bg-white text-gray-500 h-[64px] w-auto sm:w-96 2xl:w-full 3xl:w-full shadow-md"
            placeholder="Select Provider Name"
          />
          <div className="  flex items-center mx-auto">
            <SelectBox
              countries={optionData}
              className=" w-[55dvw] bg-white text-gray-500 shadow-md"
              provider={providername}
            />
            <div className=" absolute hidden sm:block  sm:-right-3 md:-right-6 lg:-right-3 xl:right-3 2xl:right-3 3xl:right-12 bg-[#38BDEF] rounded-full text-white hover:bg-[#38BDEF] hover:opacity-70 transition duration-500 ease-in-out p-1.5 sm:p-2 md:p-2 lg:p-2 xl:p-2.5 ml-auto">
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
