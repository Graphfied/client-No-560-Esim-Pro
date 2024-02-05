"use client";
import { useState } from "react";
import { Button } from "../ui/button";

export const CheckUsageButton = ({ params }: { params: string }) => {
  const [orderId, setOrderId] = useState(params || "");
  const [error, setError] = useState("");
  const orderRegex = /^(MM|WOW)-\d+$/; // Regular expression to match MM-12345 or WOW-2418200 format
  const handleCheck = () => {
    // Check if the entered order ID matches the specified format
    if (orderRegex.test(orderId)) {
      // Navigate to the '/usage' page with the entered order ID as a query parameter
      // You can replace the '/usage' path with your actual path
      window.location.href = `/usage?orderId=${orderId}`;
    } else {
      // Display an error message
      setError("Invalid order ID format");
      // Log the error message to the console
      console.error("Invalid order ID format");
    }
  };

  return (
    <div className="w-full">
      <p>Alternatively, enter your order number:</p>
      <div className="flex flex-col sm:flex-row  w-full sm:space-x-2 space-y-2 sm:space-y-0">
        <div className=" w-full flex items-center relative">
          <input
            className="w-full rounded-md border-2 border-btnblue outline-none px-6 focus:shadow-sm py-2 focus:shadow-btnblue"
            placeholder={params || `MM-12345`}
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              setError(""); // Clear the error when the user starts typing
            }}
          />
          {/* {params && (
            <>
              <div className=" absolute right-2">
                <Button size={"icon"} variant={"ghost"} className="">
                  <XIcon />
                </Button>
              </div>
            </>
          )} */}
        </div>

        <Button
          className="bg-btnblue hover:bg-hoverbtnblue "
          size="lg"
          onClick={handleCheck}
        >
          Check
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
