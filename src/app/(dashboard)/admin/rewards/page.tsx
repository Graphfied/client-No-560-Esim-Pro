import { getAdminRewards } from "@/actions/getAdminRewards";
import { RewardsButton } from "@/views/Admin/RewardsPage/RewardsButton";
import React from "react";

const RewardsPage = async () => {
  const rewardPercent: any = await getAdminRewards();

  return (
    <div className=" my-7 px-7">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">Rewards</h1>
      </div>

      <RewardsButton data={rewardPercent[0]} />
    </div>
  );
};

export default RewardsPage;
