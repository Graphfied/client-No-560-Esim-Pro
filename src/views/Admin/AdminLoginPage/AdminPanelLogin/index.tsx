"use client";
import { User } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AdminPanelLogin = ({
  mobiId,
  currentUser,
}: {
  mobiId: string;
  currentUser: User;
}) => {
  const router = useRouter();
  const [merchantId, setMerchantId] = useState("");
  const [error, seterror] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Uncomment this line

    // Check if there is a current user
    if (!currentUser) {
      seterror("Please sign in first");
      return router.push("/login"); // Redirect to login page
    }

    // if merchant id is equal to mobimatter merchant Id then redirect the admin towards admin/orderHistory
    if (merchantId.trim() === mobiId.trim()) {
      router.push("/admin/orderhistory");
    } else {
      // Handle case where merchant id does not match
      console.error("Invalid Merchant Id");
      seterror("Invalid Merchant Id"); // Set error message
      // You could display an error message to the user here
    }
    // Perform any form submission logic here
    // For example, you can use router.push('/dashboard') to navigate
    // or send a request to your authentication API.
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-28 space-y-5 ">
      {/* Heading */}
      <div className=" font-medium text-xl tracking-widest">
        <h1>Admin Panel Login</h1>
      </div>

      {/* Login Credentials */}
      <form onSubmit={handleSubmit} className="">
        <div className="  flex flex-col items-center justify-center space-y-5 w-[350px] mt-3 ">
          {/* Merchant Id */}
          <div className=" w-full">
            <Input
              placeholder="Enter your Merchant Id"
              className="  focus-visible:border focus-visible:border-darkblue focus-visible:ring-0 focus-visible:ring-offset-0  "
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {error && (
              <p className="text-red-500 flex items-center justify-center text-sm">
                {error}
              </p>
            )}{" "}
            {/* Display error message */}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className=" md:text-sm lg:text-base h-full
           p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]  text-white"
          >
            Login
          </Button>

          {/* Back to home Button */}
          <Link href="/">
            <Button
              className=" md:text-sm lg:text-base h-full
           p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center ml-2 bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]  text-white"
            >
              Back to home
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
