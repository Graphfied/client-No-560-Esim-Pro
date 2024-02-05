"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/lib/use-creator-store";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );

  const matches = useMediaQuery(`(max-width : 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        " flex-1 mt-4 bg-[#F2F6F8] rounded-tl-[2rem]",
        collapsed ? "ml-[70px]" : " ml-[70px] lg:ml-60"
      )}
    >
      {children}
    </div>
  );
};
