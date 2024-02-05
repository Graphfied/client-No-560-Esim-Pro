import { VerifyUserInDatabase } from "@/actions/verifyUserinDB";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface VerifyEmailPageProps {
  searchParams?: {
    token?: string;
  };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams?.token) {
    await VerifyUserInDatabase({
      token: searchParams?.token,
    });
  }

  return (
    <div className="flex flex-col gap-y-3 h-[75dvh] w-full items-center justify-center">
      {searchParams?.token && (
        <>
          <h2 className="text-3xl font-medium text-[#38BDEF]">
            Your email is verified
          </h2>
          {/* Return Button */}
          <Link href="/login?callback=/" className="my-5 block">
            <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
              Continue to Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
