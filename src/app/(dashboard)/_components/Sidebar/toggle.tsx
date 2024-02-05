"use client";

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/lib/use-creator-store";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";
import { Hint } from "../hint";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className=" w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant={"ghost"}
              className=" h-auto p-2"
            >
              <ArrowRightFromLine className=" h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className=" p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className=" font-semibold text-primary text-white">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant={"ghost"}
              className=" h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className=" h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
