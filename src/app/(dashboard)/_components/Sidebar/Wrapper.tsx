"use client";

import { useCreatorSidebar } from "@/lib/use-creator-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <aside
      className={cn(
        " fixed left-0 flex flex-col justify-between  w-[70px] lg:w-60 h-full border-r border-blue-800 z-50 bg-blue-800 text-white",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
