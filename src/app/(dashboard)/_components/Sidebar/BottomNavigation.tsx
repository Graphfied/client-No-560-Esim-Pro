"use client";

import { DollarSignIcon, LogOutIcon } from "lucide-react";
import { HiOutlineBolt } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item";

export const BottomNavigation = () => {
  const pathname = usePathname();

  const subRoutes = [
    {
      label: "My Wallet",
      href: `/admin/wallet`,
      icon: DollarSignIcon,
    },
    {
      label: "API",
      href: `/admin/api`,
      icon: HiOutlineBolt,
    },
    {
      label: "Logout",
      href: `/adminlogin`,
      icon: LogOutIcon,
    },
  ];
  return (
    <ul className=" space-y-2 px-2 pt-4 lg:pt-0 mb-3">
      {subRoutes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
