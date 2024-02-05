"use client";

import Image from "next/image";
import img from "../../../public/profile/logOut.svg";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowRight } from "lucide-react";

export const LogOutButton = () => {
  const router = useRouter();
  const logout = async () => {
    await signOut({
      callbackUrl: "/",
    });
    router.push("/");
  };

  return (
    <div
      className=" flex h-[3rem] justify-between items-center px-4 py-2 w-full bg-white drop-shadow-md rounded-md cursor-pointer"
      onClick={() => logout()}
    >
      <div className="flex justify-start space-x-2">
        <Image alt="" height={25} width={25} src={img} />
        <p>Logout</p>
      </div>
      <ArrowRight className="text-btnblue" />
    </div>
  );
};
