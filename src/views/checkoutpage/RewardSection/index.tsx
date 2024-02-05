import React from "react";
import { CreditSection } from "@/views/checkoutpage/CreditSection";
import { RewardSelect } from "../RewardSelect";
import { ProceedButton } from "../ProceedButton";
import { User } from "@/components/navbar";
import { IProductsProps } from "@/app/(main)/esim/[search]/page";

interface RewardSectionProps {
  data: IProductsProps;
  currentUser: User;
  createdOrderId: string;
  rewardsPercentage: {
    id?: string;
    reward?: string;
    cashbackpercent?: string;
    discountpercent?: string;
  };
}

export const RewardSection = ({
  data,
  currentUser,
  createdOrderId,
  rewardsPercentage,
}: RewardSectionProps) => {
  return (
    <div className="flex flex-col w-full lg:max-w-[890px] px-5">
      {/* Credit Section */}
      <CreditSection currentUser={currentUser} />

      {/* Reward section */}
      <div className=" mt-3">
        <RewardSelect
          data={data}
          rewardsPercentage={rewardsPercentage}
          orderid={createdOrderId}
        />
      </div>

      {/* Separator */}
      <div className=" w-full flex items-center my-8">
        <span className=" bg-black/10 w-full h-0.5"></span>OR{" "}
        <span className=" h-0.5 bg-black/10 w-full"></span>
      </div>

      <ProceedButton
        data={data}
        currentUser={currentUser}
        createdOrderId={createdOrderId}
        discountPercentage={rewardsPercentage?.discountpercent}
      />
    </div>
  );
};
