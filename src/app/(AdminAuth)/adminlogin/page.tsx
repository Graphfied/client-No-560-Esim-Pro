import Image from "next/image";
import React from "react";
import LoginPageImage from "/public/login/login-banner.png";
import { AdminPanelLogin } from "@/views/Admin/AdminLoginPage/AdminPanelLogin";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAdminKeys } from "@/actions/getAdminKeys";

const AdminLoginPage = async () => {
  const currentUser: any = await getCurrentUser();
  const adminKeys: any = await getAdminKeys();
  const mobimatterId = adminKeys[0]?.merchantid as string;
  return (
    <div className="flex flex-col lg:flex-row mx-auto mb-14 w-full 2xl:w-[1500px] 3xl:w-[1400px] 3xl:gap-x-16 my-7">
      {/* Left Side Image */}
      <div className="flex items-center lg:mx-2 relative w-full lg:w-[700px] xl:w-[900px]">
        {/* Image Container */}
        <div className="relative w-full lg:w-full  ">
          <Image
            src={LoginPageImage}
            alt=""
            className="object-cover w-full h-auto lg:h-[600px] xl:h-full"
          />
          {/* Opacity Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {/* Text */}
            <div className="text-white text-2xl sm:text-4xl md:text-[2.5rem] leading-tight mb-4 w-full max-w-[500px] text-center lg:text-left lg:pl-8">
              <strong className="">Welcome to Admin Dashboard</strong>
              <h1>Get access to travel eSIMs for over a hundred countries</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-grow">
        <AdminPanelLogin mobiId={mobimatterId} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default AdminLoginPage;
