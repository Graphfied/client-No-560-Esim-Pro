import React from "react";
import { Wrapper } from "./Wrapper";
import { ToggleSkeleton } from "./toggle";
import { Navigation } from "./Navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import { BottomNavigation } from "./BottomNavigation";
import { NavItemSkeleton } from "./nav-item";

export const Sidebar = async () => {
  const currentUser: any = await getCurrentUser();

  return (
    <Wrapper>
      {/* <Toggle /> */}
      <Navigation currentUser={currentUser} />
      <BottomNavigation />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <NavItemSkeleton />
    </aside>
  );
};
