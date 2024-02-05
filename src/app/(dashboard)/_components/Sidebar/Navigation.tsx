"use client";

import { usePathname } from "next/navigation";
import { Users, RotateCcwIcon, MedalIcon } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { User } from "@/components/navbar";
import { BsCardHeading } from "react-icons/bs";
import Image from "next/image";

export const Navigation = ({ currentUser }: { currentUser: User }) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Orders History & Topup",
      href: `/admin/orderhistory`,
      icon: RotateCcwIcon,
    },
    {
      label: "Users",
      href: `/admin/users`,
      icon: Users,
    },
    {
      label: "Rewards",
      href: "/admin/rewards",
      icon: MedalIcon,
    },
    {
      label: "Site Title",
      href: "/admin/title",
      icon: BsCardHeading,
    },
  ];

  if (!currentUser.name) {
    return (
      <ul className=" space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="p-4 mx-auto mb-3"
      />

      {/* <Toggle /> */}
      <ul className=" space-y-2 px-2 pt-4 lg:pt-0">
        {routes.map((route) => (
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        ))}
      </ul>
    </div>
  );
};
