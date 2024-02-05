"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "/public/logo.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GetRegisterUser } from "@/actions/getRegisterUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignupComponent = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setisLoading] = React.useState(false);

  const handleSignUpSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setisLoading(true);
      setError(null);
      const data = new FormData(e.currentTarget);

      const response: any = await GetRegisterUser({
        name: data.get("name") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
      });
      toast.success("Signup Successfully");
      router.push(`/login`);
      return response;
    } catch (error: any) {
      console.error("Error during sign up:", error.message);
      toast.error(error.message);
      setError("An unexpected error occurred during sign up.");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20 space-y-5 ">
      {/* Logo */}
      <div className="">
        <Link href={"/"}>
          <Image src={Logo} alt="" width={120} height={120} />
        </Link>
      </div>

      {/* Text Button */}
      <div className="text-btnblue">
        {/* <Link href={"/login"}>
        </Link> */}
        <p>Sign up</p>
      </div>

      {/* Sign Up Details */}
      <form
        onSubmit={handleSignUpSubmit}
        method="POST"
        className=" flex flex-col items-center justify-center space-y-5 w-[234px]  "
      >
        {/* Name */}
        <div className="">
          <Input
            type="text"
            name="name"
            placeholder="Enter your Name"
            className=" w-[234px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-1 focus-visible:border-neutral-800"
          />
        </div>
        {/* Email */}
        <div className="">
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className=" w-[234px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-1 focus-visible:border-neutral-800"
          />
        </div>
        {/* Password */}
        <div className="">
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className=" w-[234px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-1 focus-visible:border-neutral-800"
          />
        </div>
        {/* Error Message */}
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {/* Submit Button */}
        <div className="  w-full">
          <Button
            disabled={isLoading}
            className=" w-full bg-[#38BDEF] text-lg hover:bg-white hover:text-[#38BDEF] border-2 border-[#38BDEF] text-white p-2 "
          >
            Sign Up
          </Button>
        </div>
        {/* Login Assistance */}
        <p className="text-sm text-neutral-700 mt-2">
          Already login?{" "}
          <a href="/login" className="text-[#38BDEF] hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupComponent;
