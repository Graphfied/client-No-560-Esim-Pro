import { AddRewardInTable } from "@/actions/AddRewardinTable";
import { UpdateRewardBalanceOfUser } from "@/actions/UpdateRewardBalanceOfUser";
import { getRewardHistoryByEmail } from "@/actions/getRewardHistory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";
import { useEffect, useState } from "react";

let data = [
  {
    date: "1-1-1111",
    orderId: "WOW-11111",
    type: "Added",
    amount: "80",
  },
  {
    date: "2-2-2222",
    orderId: "WOW-22222",
    type: "Deducted",
    amount: "90",
  },
  {
    date: "1-1-1111",
    orderId: "WOW-11111",
    type: "Added",
    amount: "80",
  },
  {
    date: "2-2-2222",
    orderId: "WOW-22222",
    type: "Deducted",
    amount: "90",
  },
];

interface EditUserProps {
  name: string;
  email: string;
  balance: string;
}

export function EditUser({ name, email, balance }: EditUserProps) {
  const [open, setOpen] = useState(false);
  const [reward, setReward] = useState("");
  const [rewardHistory, setRewardHistory] = useState<any[]>([]); // Adjust the type accordingly
  const [addAmount, setAddAmount] = useState("");
  const [deductAmount, setdeductAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRewardHistoryByEmail(email);
        setRewardHistory(res || []); // Ensure that res is not null or undefined
      } catch (error) {
        console.error("Error fetching reward history:", error);
      }
    };

    fetchData();
  }, [email, balance]); // Include getRewardHistoryByEmail in the dependency array

  const handleAddAmount = async () => {
    // add rewards
    const updateBalance: any = parseFloat(balance) + parseFloat(reward);
    // console.log("Updated Balance ---> ", updateBalance);

    await UpdateRewardBalanceOfUser({
      email: email,
      updateBalance: updateBalance,
    });
    await AddRewardInTable({
      type: "Added",
      amount: updateBalance,
      datetime: new Date().toLocaleDateString(),
      email: email,
    });
  };

  const handleDeductAmount = async () => {
    //  10           -     2
    const updateBalance: any = parseFloat(balance) - parseFloat(reward);
    // console.log("Updated Balance ---> ", updateBalance);

    await UpdateRewardBalanceOfUser({
      email: email,
      updateBalance: updateBalance,
    });
    await AddRewardInTable({
      type: "Deducted",
      amount: updateBalance,
      datetime: new Date().toLocaleDateString(),
      email: email,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs p-2 border-[#38BDEF] text-[#38BDEF] hover:bg-[#38BDEF] hover:text-white my-1"
        >
          Manage <ChevronRight size={15} className="ml-1" />
        </Button>
      </DialogTrigger>
      {/* Modal */}
      <DialogContent className="h-[95%] min-w-[95%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <div>
            <div className="flex gap-x-20 mt-3">
              {/* Email */}
              <div>
                <p className="text- text-black">Email</p>
                <p className="text-sm">{email}</p>
              </div>
              {/* Balance */}
              <div>
                <p className="text-xs text-black">Balance</p>
                <p className="text-sm">${balance}</p>
              </div>
            </div>

            {/* Add Virtual credits */}
            <div className="flex flex-col gap-x-20 mt-3">
              <h3 className="text-sm font-medium">
                Add or remove virtuals credits
              </h3>
              {/* Input */}
              <div className="flex gap-x-3 max-w-full lg:max-w-[30%]">
                <input
                  value={reward}
                  className="w-full rounded-l-md focus:outline-none px-1 border border-gray-200"
                  onChange={(e) => setReward(e.target.value)}
                />

                <Button
                  onClick={() => handleAddAmount()}
                  size="sm"
                  className="text-xs py-2 px-3 bg-lime-500 text-white hover:bg-lime-600 hover:text-white"
                >
                  Add
                </Button>

                <Button
                  onClick={() => handleDeductAmount()}
                  size="sm"
                  className="text-xs py-2 px-3  bg-rose-500 text-white hover:bg-rose-600 hover:text-whit"
                >
                  Deduct
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
        {/* Table */}
        <table className="bg-white border border-gray-300 w-full text-gray-700 mt-2">
          <thead>
            <tr className="text-sm">
              <th className="text-left py-2 px-2">Date</th>
              <th className="text-left py-2 pr-2">Transaction ID</th>
              <th className="text-left py-2 pr-2">Type</th>
              <th className="text-left py-2 pr-2">Amount</th>
            </tr>
          </thead>
          <tbody className=" ">
            {rewardHistory?.map((item: any, index: any) => (
              <tr
                key={index}
                className="text-center border border-b text-sm sm:text-base  "
              >
                <td className="text-left text-sm border sm:border-none p-1 break-all flex gap-x-1 items-center mt-2 ">
                  {item.datetime}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all ">
                  {item.transactionid}
                </td>
                <td className="text-left text-sm border sm:border-none p-1 break-all">
                  {item.type}
                </td>
                <td
                  className={`text-left text-sm border sm:border-none p-1 break-all ${
                    item.type === "Added" ? "text-lime-600" : "text-rose-600"
                  }`}
                >
                  {item.type === "Added" ? "+" : "-"} ${item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
