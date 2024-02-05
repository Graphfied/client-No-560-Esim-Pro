"use client";

import React, { useState } from "react";
import { MultiSelect } from "../multiSelectSearch";
import { TopUpSearchSelector } from "./TopUpSearchSelector";

interface TopupSelectProps {
  optionData: any;
  providerName: string;
  paramCountry: string;
  providers: { logo: string; label: string; value: string }[];
}

export const TopupSearchSelect = ({
  optionData,
  providerName,
  paramCountry,
  providers,
}: TopupSelectProps) => {
  const [providername, setProvidername] = useState("");
  // sending params array to multi select
  const urlCountry: string[] = [];
  urlCountry.push(paramCountry);

  const handleSelectValue = (value: string) => {
    setProvidername(value);
  };
  return (
    <div className=" flex items-center max-w-[1140px] mx-auto   gap-x-3 h-auto">
      {/* TopUp Search Page Selector */}
      <TopUpSearchSelector
        onSelect={handleSelectValue}
        data={providers}
        className=" bg-white text-gray-500 h-[64px] w-96 shadow-md"
        placeholder="Select Provider Name"
        provider={providerName}
        country={paramCountry}
      />
      <MultiSelect
        options={optionData}
        countryData={optionData}
        className=" w-[55dvw] shadow-md"
        params={urlCountry}
        baseUrl={`/topup/${providerName}`}
      />
    </div>
  );
};
