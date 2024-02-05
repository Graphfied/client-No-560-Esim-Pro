"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

export default function UserButton({
  isLargeScreen,
}: {
  isLargeScreen: boolean;
}) {
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      const data = await getCurrentUser();
      // console.log("USER BUTTON DATA", data);
      setCurrentUser(data);
    }
    fetchData();
  }, [currentUser]);

  const router = useRouter();

  function getInitials(fullName: string) {
    const names = fullName?.split(" ");
    const initials = names?.map((name) => name[0].toUpperCase());
    return initials?.join("");
  }

  return (
    <div>
      {/* if we have Current User */}
      {currentUser ? (
        <>
          <div className="flex items-center gap-2">
            <Link href={"/profile"} className="hidden lg:block">
              <Avatar>
                <AvatarImage src={currentUser?.image} alt="user" />
                <AvatarFallback className="bg-white border border-[#38BDEF] text-[#38BDEF]">
                  {getInitials(currentUser?.name)}
                </AvatarFallback>
              </Avatar>
            </Link>
            {/* Reward Balance */}
            <Link href="/profile/wallet">
              <p className="text-[9px] text-black">Reward Balance</p>
              <p className="text-[15px] mt-0.5 font-[450] text-black">
                {currentUser ? currentUser?.rewardbalance : 0.0}
              </p>
            </Link>
          </div>
        </>
      ) : (
        <>
          {isLargeScreen ? (
            <Button
              className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
              onClick={() => router.push(`/login?callback=/`)}
            >
              Join Now
            </Button>
          ) : (
            <Button
              className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
              onClick={() => router.push("/login?callback=/")}
            >
              <LogIn />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
