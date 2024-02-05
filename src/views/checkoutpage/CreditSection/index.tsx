"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../../public/logo.png";
import { User } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

interface CreditSectionProps {
  currentUser?: User;
}

export const CreditSection = ({ currentUser }: CreditSectionProps) => {
  const router = useRouter();
  const [customBalance, setCustomBalance] = useState<number>(
    currentUser?.rewardbalance!
  );
  const [error, setError] = useState<string | null>(null);

  // const handleCustomBalanceChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   // const newBalance = parseFloat(event.target.value);
  //   // const newBalance: any = event.target.value;
  //   const inputValue = event.target.value.trim(); // Remove leading/trailing whitespaces
  //   const newBalance = Number(inputValue);
  //   if (!isNaN(newBalance) && newBalance >= 0) {
  //     setCustomBalance(newBalance);
  //     setError(null);
  //   } else {
  //     setError("Please enter a valid positive number");
  //   }
  // };
  const handleCustomBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.trim(); // Remove leading/trailing whitespaces

    if (inputValue === "") {
      setCustomBalance(null!); // Set to null when input is empty
      setError(null);
    } else {
      const newBalance = Number(inputValue);
      if (!isNaN(newBalance) && newBalance >= 0) {
        setCustomBalance(newBalance);
        setError(null);
      } else {
        setError("Please enter a valid positive number");
      }
    }
  };

  const addBalance = () => {
    // Implement your logic for adding balance here
    // For example, you can call an API to add the balance
    // and update the state accordingly
    if (customBalance > currentUser?.rewardbalance!) {
      setError("You don't have enough balance.");
    } else {
      // Logic to add balance
      const updatedUrl = new URL(window.location.href);
      updatedUrl.searchParams.set("balance", customBalance.toString());
      router.replace(updatedUrl.toString());
      // console.log("Adding balance:", customBalance);
      setError(null);
    }
  };
  return (
    <>
      {/* Heading*/}
      <h1 className="  text-lg mb-2">Use your credit</h1>
      <div className="flex flex-col space-y-1 sm:space-y-0 justify-center sm:flex-row items-center sm:justify-between bg-white p-6 shadow-md rounded-md">
        {/* logo */}
        <div className="">
          <Image src={Logo} alt="Site-Logo" width={60} height={60} />
        </div>

        {/* heading */}
        <div className=" mt-1 sm:mt-0 text-muted-foreground">
          <p>MobiMatter Rewards</p>
        </div>

        {/* insufficient Button */}
        {/* <div className=" ">
          {currentUser?.rewardbalance! > 0 ? (
            <>
              <div className=" flex items-center ">
                <div className=" bg-gray-400 text-muted p-2 rounded-md ">
                  <p>${currentUser?.rewardbalance}</p>
                </div>
                <Button size={"sm"} className=" p-3">
                  Add
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-400 text-muted p-1 rounded-md">
                <p className=" text-xs">Insufficient Funds</p>
              </div>
            </>
          )}
        </div> */}

        {/* input field for custom balance */}
        {currentUser?.rewardbalance! > 0 ? (
          <>
            <div className=" flex gap-2   sm:gap-4 p-2 ">
              <div className="flex flex-col ">
                <div className="flex flex-col md:flex-row items-center  md:w-full">
                  <input
                    type="number"
                    value={customBalance !== undefined ? customBalance : ""}
                    placeholder={customBalance?.toString()}
                    onChange={handleCustomBalanceChange}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                    // className="border p-1 rounded-md focus-visible:border focus-visible:border-neutral-500"
                    className="w-[130px] md:w-full rounded-l-md focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border border-gray-200 p-1"
                  />
                  {customBalance !== undefined && (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setCustomBalance(undefined!);
                        const updatedUrl = new URL(window.location.href);
                        updatedUrl.searchParams.delete("balance");
                        router.replace(updatedUrl.toString());
                        setError(null);
                      }}
                    >
                      <XIcon />
                    </div>
                  )}
                </div>
                <div className="">
                  {/* error message */}
                  {error && <p className="text-red-500  text-xs">{error}</p>}
                </div>
              </div>

              {/* add button */}
              <div className="">
                <Button size="sm" className="p-3" onClick={addBalance}>
                  Add
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-400 text-muted p-2 rounded-md">
              <p className=" text-xs">Insufficient Funds</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
