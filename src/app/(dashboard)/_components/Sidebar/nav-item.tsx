"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatorSidebar } from "@/lib/use-creator-store";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        " w-full h-12 text-white text-sm font-normal hover:bg-gray-200/90",
        collapsed ? "justify-center" : "justify-start",
        isActive && " bg-gray-300/30 "
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn(" h-4 w-4", collapsed ? " mr-0" : "mr-0")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className=" flex items-center gap-x-4 px-3 py-2">
      <Skeleton className=" min-h-[48px] min-w-[48px] rounded-md" />
      <div className=" flex-1 hidden lg:block">
        <Skeleton className=" h-6" />
      </div>
    </li>
  );
};
