"use client";

import Image from "next/image";
import Logo from "../../../public/logo.png";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckVerifiedUser } from "@/actions/CheckVerifiedUser";

export const LoginComponent = () => {
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isDisabled, setisDisabled] = useState(true);
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const isCallbackUrl = searchParams.has("callbackUrl");
  useEffect(() => {
    if (email !== "" && password !== "") {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [email, password]);
  // // Check if id is defined, otherwise set it to an empty string
  // const productId = searchParams.get("callbackUrl");
  // const id = productId?.split("=")[1] || "";

  // // Construct the callbackUrl based on the presence of id
  // const callbackUrl = isCallbackUrl && id ? `/checkout?id=${id}` : "/";

  const GoogleLoginFunction = async () => {
    await signIn("google", {
      // callbackUrl: callbackUrl,
      callbackUrl: "/",
    });
  };

  const handleSignInSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("Handling sign-in submit");
    setisLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const checkUser = await CheckVerifiedUser({
      email: email as string,
    });

    // console.log("Check User ----> ", checkUser);

    if (checkUser === undefined) {
      setisLoading(false);
      toast.error("User not registered. Please signup first.");
    }

    if (checkUser === false) {
      setisLoading(false);
      toast.error("Please verify your email.");
    }

    if (checkUser === true) {
      await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
      }).then((callback) => {
        setisLoading(false);

        if (callback?.status === 200) {
          window.location.reload();
          toast.success("Logged in");
          router.push("/");
        }

        // console.log("Callback Status ---> ", callback?.status);
        // console.log("Callback Status ---> ", callback?.url);
        // if (callback?.ok) {

        // } else {
        //   console.log("Error in Login !");
        // }
        // // if error
        // if (callback?.error) {
        //   toast.error(callback.error);
        // }
      });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-full mt-5 space-y-5 ">
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
        <p>Log in / Sign up</p>
      </div>

      {/* Social Login */}
      <div className=" flex flex-col items-center justify-center space-y-5 w-[234px]  ">
        <Button
          onClick={GoogleLoginFunction}
          className=" bg-white text-black hover:bg-white hover:opacity-70 shadow-md space-x-3 w-[234px]"
        >
          <FaGoogle size={20} className=" text-red-700" />
          <p>Sign in with Google</p>
        </Button>
        {/* <Button
          onClick={GithubLoginFunction}
          className=" bg-black text-white hover:bg-gray-800 w-[234px]  hover:opacity-70 shadow-md space-x-3"
        >
          <FaGithub size={20} />
          <p>Sign in with GitHub</p>
        </Button> */}
        <Button className=" bg-[#1877F2] text-white hover:bg-[#1877F2] w-[234px]  hover:opacity-70 shadow-md space-x-3">
          <FaFacebook size={20} />
          <p>Sign in with Facebook</p>
        </Button>
        <Button className=" bg-neutral-900 text-white w-[234px] hover:bg-black hover:opacity-70 shadow-md space-x-3">
          <FaApple size={20} />
          <p>Sign in with Apple</p>
        </Button>
        {/* <Button className=" bg-[#c71610] text-white w-[234px] hover:bg-[#c71610] hover:opacity-70 shadow-md space-x-3">
          <CiMail size={20} />
          <p>Sign in with email</p>
        </Button> */}
      </div>

      {/* Separator */}
      <div className=" w-[234px] flex items-center my-8">
        <span className=" bg-black/10 w-full h-0.5"></span>OR{" "}
        <span className=" h-0.5 bg-black/10 w-full"></span>
      </div>

      {/* Credential Login */}
      <form
        onSubmit={handleSignInSubmit}
        className=" flex flex-col items-center justify-center space-y-5 w-[234px]  "
      >
        {/* Email */}
        <div className="">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your Email"
            className=" w-[234px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-1 focus-visible:border-neutral-800"
          />
        </div>
        {/* Password */}
        <div className="">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your Password"
            className=" w-[234px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-1 focus-visible:border-neutral-800"
          />
        </div>

        {/* Submit Button */}
        <div className="  w-full">
          <Button
            disabled={isDisabled || isLoading}
            className=" w-full bg-[#38BDEF] text-lg hover:bg-white hover:text-[#38BDEF] border-2 border-[#38BDEF] text-white p-2 "
          >
            Login
          </Button>
        </div>

        {/* Sign Up Link */}
        <p className="text-sm text-neutral-700 mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#38BDEF] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      <div className=" max-w-[60%]">
        {/* Text */}
        <p className=" text-center">
          By continuing, you are indicating that you accpet our{" "}
          <span className=" text-btnblue">Terms of Service</span> and{" "}
          <span className=" text-btnblue">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};
