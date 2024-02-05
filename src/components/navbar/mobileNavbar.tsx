"use client";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, dropdownMenuData, MobiUser } from ".";
import { useState } from "react";
import UserButton from "./userButton";
import { usePathname } from "next/navigation";

interface MobileNavbarProps {
  currentUser?: User;
}

export default function MobileNavbar({ currentUser }: MobileNavbarProps) {
  const bottomBarData = [
    {
      label: "Home",
      href: "/",
      img: "/navbar/home.svg",
    },
    {
      label: "Topups",
      href: "/topup",
      img: "/navbar/topup.svg",
    },
    {
      label: "My eSIMs",
      href: currentUser ? "/profile/history?type=esim" : "/login?callback=/",
      img: "/navbar/esim.svg",
    },
    {
      label: "Profile",
      href: currentUser ? "/profile" : "/login?callback=/",
      img: currentUser?.image || "/unknownUser.jpeg",
    },
  ];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Function to determine text color based on conditions
  const getTextColor = (label: string) => {
    if (
      (pathname === "/" && label === "Home") ||
      (pathname === "/topup" && label === "Topups") ||
      (pathname === "/profile" && label === "Profile") ||
      (pathname === "/profile/history" && label === "My eSIMs")
    ) {
      return "text-[#38BDEF]";
    } else {
      return "text-txtgrey";
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-16 px-2  border-b-2 border-[#F2F6F8] ">
      {/* Hamburger Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu size={25} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full h-screen overflow-y-auto pt-10 z-[100]"
        >
          {dropdownMenuData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-start gap-x-3 w-full rounded-lg hover:bg-slate-50 duration-200 ease-in-out transition-colors mb-5 p-2"
              onClick={() => setOpen(false)}
            >
              <Image
                src={item.icon}
                alt="icon"
                width={20}
                height={20}
                className="rounded-lg mt-1"
              />
              <div className="space-y-1">
                <h2>{item.label}</h2>
                <h4 className="text-slate-400">{item.description}</h4>
              </div>
            </Link>
          ))}
        </SheetContent>
      </Sheet>
      {/* Logo */}
      <Logo />
      {/* Login Button */}
      <UserButton isLargeScreen={false} />
      {/* Fixed Bar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-between border border-l-0 border-r-0 border-b-0 border-t-4 border-t-gray-100 p-3 sm:px-5 md:px-10 w-full">
        {bottomBarData.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-between w-fit"
          >
            {/* Icon  */}
            <Image
              src={item.img}
              alt="icon"
              width={25}
              height={25}
              className={item.label === "Profile" ? "rounded-full h-7 w-7" : ""}
            />
            {/* Label */}
            <h2 className={`text-sm font-[450]  ${getTextColor(item.label)}`}>
              {item.label}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
