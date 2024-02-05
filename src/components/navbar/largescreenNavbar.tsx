import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import { User, navbarData, MobiUser } from ".";
import { ChevronDown } from "lucide-react";
import DropdownMenu from "./dropdownMenu";
import UserButton from "./userButton";

export default function LargescreenNavbar() {
  return (
    <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-8 h-16 border-b-4 border-[#F2F6F8] z-[100] relative">
      {/* Logo */}
      <Logo />
      {/* Links and Buttons */}
      <div className="flex items-center gap-7 h-full">
        {navbarData.map((item, index) => (
          <ul
            key={index}
            className="flex items-center text-sm h-full duration-300 transition-colors ease-in-out"
          >
            <li>
              {index === 0 ? (
                <div className="cursor-pointer group h-14 flex items-center">
                  <span className="hover:text-slate-500 flex items-center text-black">
                    {item.text}
                    <ChevronDown className="h-5 w-5 ml-1 hover:text-slate-500" />
                  </span>

                  {/* Dropdown menu */}
                  <div className="invisible group-hover:visible -translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 absolute top-16 left-0 w-full transition-all duration-300">
                    <DropdownMenu />
                  </div>
                </div>
              ) : (
                <Link
                  className="hover:text-slate-500 text-black"
                  href={item.href}
                >
                  {item.text}
                </Link>
              )}
            </li>
          </ul>
        ))}
        {/* Button */}
        <UserButton isLargeScreen={true} />
      </div>
    </div>
  );
}
