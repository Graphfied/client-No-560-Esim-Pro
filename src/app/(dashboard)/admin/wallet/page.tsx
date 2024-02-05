import { getAdminWalletBalance } from "@/actions/getAdminWalletBalance";
import { DollarSign, Info } from "lucide-react";

const AdminWalletPage = async () => {
  const myBalance = await getAdminWalletBalance();

  return (
    <div className="w-full min-h-screen  my-7 px-10">
      {/* Heading */}
      <div className=" mb-3">
        <h1 className=" text-xl font-medium">My Wallet</h1>
      </div>
      {/* <p className="pt-10 text-lg">MobiMatter Rewards</p>s */}
      <div className="w-full h-[12rem] bg-darkblue rounded-sm dropshadow-md p-[1rem] text-white flex flex-col justify-between">
        <div className="flex flex-col justiy-end space-y-2">
          <p>Your balance</p>
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 lg:h-16 lg:w-16" />
            <p className="lg:text-[4rem] text-[2rem]">
              {myBalance?.result?.balance}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Info size="16" />
          <p className="pl-1">Get 10% cashback with every purchase!</p>
        </div>
      </div>
    </div>
  );
};

export default AdminWalletPage;
