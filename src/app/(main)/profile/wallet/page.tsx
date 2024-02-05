import { Info, DollarSign } from "lucide-react";

import WalletPageComponent from "@/components/profilePageComponents/WalletPageComponent";
// import TransactionTable from "@/views/wallet/transactionTable";
import getCurrentUser from "@/actions/getCurrentUser";

const Wallet = async () => {
  const currentUser: any = await getCurrentUser();

  return (
    <div className="w-full min-h-screen lg:px-[22rem] px-[2rem]">
      <p className="pt-10 text-lg">MobiMatter Rewards</p>
      <div className="w-full h-[12rem] bg-darkblue rounded-sm dropshadow-md p-[1rem] text-white flex flex-col justify-between">
        <div className="flex flex-col justiy-end space-y-2">
          <p>MobiPay balance</p>
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 lg:h-16 lg:w-16" />
            <p className="lg:text-[4rem] text-[2rem]">
              {currentUser?.rewardbalance}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Info size="16" />
          <p className="pl-1">Get 10% cashback with every purchase!</p>
        </div>
      </div>
      <WalletPageComponent currentUser={currentUser} />
      {/* <TransactionTable /> */}
    </div>
  );
};

export default Wallet;
