import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

export const AdminButton = () => {
  return (
    <Link
      href={`/adminlogin`}
      className=" flex h-[3rem] justify-between items-center px-4 py-2 w-full bg-white drop-shadow-md rounded-md cursor-pointer"
    >
      <div className="flex justify-start space-x-2">
        {/* <Image alt="" height={25} width={25} src={img} /> */}
        <Shield className="text-btnblue" />
        <p>Admin Panel</p>
      </div>
      <ArrowRight className="text-btnblue" />
    </Link>
  );
};
