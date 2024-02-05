"use client";
import { MainTopupSelector } from "@/components/TopupSelect/MainTopupSelector";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export const OrderhistoryFilters = ({
  onFilterChange,
  onSelectChange,
  onClearResults,
  usersData,
}: {
  onFilterChange: (value: string) => void;
  onSelectChange: (value: string) => void;
  onClearResults: () => void;
  usersData: any;
}) => {
  const [localOrderNumber, setLocalOrderNumber] = useState("");
  const refinedUsersData = usersData.map((item: any) => ({
    label: item.name,
    value: item.email,
  }));
  const handleGoButtonClick = () => {
    // Pass the value to the parent component through the callback
    onFilterChange(localOrderNumber);
  };

  const handleSelectValue = (value: string) => {
    // onSelectChange(value);
    // Find the user object with the selected email
    const selectedUser = usersData.find((user: any) => user.email === value);

    // If a user is found, send the user's name to onSelectChange
    if (selectedUser) {
      // console.log("user inside filters", selectedUser);
      onSelectChange(selectedUser.email);
    } else {
      // If no user is found, you can choose to handle this case accordingly
      console.error("User not found for email:", value);
      onSelectChange(""); // Set the selected user to an empty string or handle it as needed
    }
  };

  const handleClearButtonClick = () => {
    // Clear the local search value
    setLocalOrderNumber("");
    // Clear the search results in the parent component through the callback
    onClearResults();
  };

  return (
    <div className=" flex flex-col md:flex-row w-full items-end  justify-between">
      {/* Order Filter */}
      <div className="flex w-full md:max-w-[40%] lg:max-w-[30%] h-8">
        <input
          value={localOrderNumber}
          className="w-full rounded-l-md focus:outline-none px-1 border border-gray-200"
          onChange={(e) => setLocalOrderNumber(e.target.value)}
        />
        <Button
          onClick={handleGoButtonClick}
          className="text-xs md:text-sm lg:text-base h-full
           p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] text-white"
        >
          Go
        </Button>
        <Button
          onClick={handleClearButtonClick}
          className="text-xs md:text-sm lg:text-base h-full
           p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] text-white"
        >
          Clear
        </Button>
      </div>

      {/* User Filters */}
      <div className="w-full md:max-w-[40%] lg:max-w-[30%] mt-3 md:sm-0 ">
        <MainTopupSelector
          onSelect={handleSelectValue}
          data={refinedUsersData}
          className=" bg-white text-gray-500 h-10  w-full sm:w-full md:w-full lg:w-full 2xl:w-full 3xl:w-full shadow-md"
          placeholder="Filter By User"
        />
      </div>
    </div>
  );
};
