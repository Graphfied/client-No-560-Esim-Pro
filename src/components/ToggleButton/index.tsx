"use client";

import { useCallback } from "react";
import useToggle from "@/utils/toggleButtonState";

export const ToggleButton = () => {
  const { selectedButton, setSelectedButton } = useToggle();

  const handleToggleCountry = useCallback(() => {
    setSelectedButton("Country");
  }, [setSelectedButton]);

  const handleToggleOrder = useCallback(() => {
    setSelectedButton("Order#");
  }, [setSelectedButton]);

  return (
    <div className=" absolute flex justify-end  md:text-xl font-medium -top-10 -right-3 sm:-top-12 sm:-right-7 md:-top-12 md:-right-7 lg:-top-12 lg:right-0 xl:-top-14 xl:right-10 2xl:-top-14 2xl:right-10  3xl:-top-14 3xl:right-10">
      <div className=" flex items-center justify-between rounded-full bg-[#1E2F4F] text-muted-foreground  md:w-60 text-white text-sm md:text-base">
        <button
          onClick={handleToggleCountry}
          className={`flex-1 py-1.5 px-2 sm:py-2 sm:px-4 rounded-full ${
            selectedButton === "Country"
              ? "bg-[#00AEEF] text-white"
              : " text-neutral-300"
          }`}
        >
          Country
        </button>
        <button
          onClick={handleToggleOrder}
          className={`flex-1 py-1.5 px-2 sm:py-2 sm:px-4 rounded-full ${
            selectedButton === "Order#"
              ? "bg-[#00AEEF] text-white"
              : " text-neutral-300"
          }`}
        >
          Order#
        </button>
      </div>
    </div>
  );
};
