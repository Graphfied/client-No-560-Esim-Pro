import { Separator } from "@/components/ui/separator";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { PiCheckFatLight } from "react-icons/pi";

export default function TopBar() {
  return (
    <div className="flex items-center mt-5 mb-14 w-full">
      <div className="flex-grow">
        <Separator className={`py-0.5 bg-lime-500 `} />
      </div>
      <div className="relative">
        <FaRegAddressCard className="text-txtgrey text-[2.5rem]" />
        <p className="text-txtgrey text-sm absolute top-12 left-1/2 -translate-x-1/2">
          Info
        </p>
      </div>
      <div className="flex-grow">
        <Separator className={`py-0.5 bg-gray-200`} />
      </div>
      <div className="relative">
        <MdPayment className="text-txtgrey text-[2.5rem]" />
        <p className="text-txtgrey text-sm absolute top-12 left-1/2 -translate-x-1/2">
          Payment
        </p>
      </div>
      <div className="flex-grow">
        <Separator className={`py-0.5 bg-gray-200`} />
      </div>
      <div className="relative">
        <PiCheckFatLight className="text-txtgrey text-[2.5rem]" />
        <p className="text-txtgrey text-sm absolute top-12 left-1/2 -translate-x-1/2">
          Complete
        </p>
      </div>
      <div className="flex-grow">
        <Separator className={`py-0.5 bg-gray-200 `} />
      </div>
    </div>
  );
}
