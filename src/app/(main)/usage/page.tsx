import { getCheckUsage } from "@/actions/getCheckUsage";
import { CheckUsageButton } from "@/components/CheckUsageButton";
import Image from "next/image";

interface CheckUsage {
  orderId: string;
  merchantId: string;
  planName: string;
  planData: string;
  validityDays: string;
  rechargeable: boolean;
  providerInfo: {
    providerName: string;
    providerLogo: string;
    message: string;
    data: {
      activationDate: string;
      expirationDate: string;
      status: string;
      balance: string;
      phone: number;
    };
  };
}

const Usage = async ({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) => {
  // console.log("Order Id ----->" , searchParams?.orderId);
  let usageData: CheckUsage = {} as any;
  if (searchParams?.orderId) {
    usageData = await getCheckUsage({
      orderId: searchParams?.orderId,
    });
  }
  // console.log("Usage Data ----->", usageData);

  return (
    <div className="min-h-[70vh] min-w-screen lg:mx-[7rem] lg:px-[1.5rem] px-[0.5rem] flex flex-col items-center pt-10 space-y-4">
      <div className="w-full">
        <h2 className="text-[1.8rem] fontsemi-bold">
          eSIM Status and Usage Check
        </h2>
        <p>You can see your data usage directly from your phone settings.</p>
      </div>

      <CheckUsageButton params={searchParams?.orderId!} />
      {/* Check */}
      {searchParams?.orderId && usageData && (
        <div className=" w-full bg-white shadow-md p-5 ">
          <div className=" pl-3">
            <Image
              src={usageData?.providerInfo?.providerLogo}
              alt=""
              width={60}
              height={60}
            />
          </div>
          <div className=" mt-3 space-y-2 ">
            <p>
              Provider Name :{" "}
              <span className=" text-[#38BDEF] font-semibold ">
                {usageData?.providerInfo?.providerName}
              </span>
            </p>
            <p className="">
              Plan Name :{" "}
              <span className="text-[#38BDEF] font-semibold ">
                {usageData?.planName}
              </span>
            </p>
            <p>
              Plan Data :{" "}
              <span
                className="
          text-[#38BDEF] font-semibold"
              >
                {usageData?.planData}
              </span>
            </p>
            <p>
              Validity :{" "}
              <span className="text-[#38BDEF] font-semibold">
                {usageData?.validityDays} Days
              </span>
            </p>
          </div>

          {/* Current Status */}
          <h3 className=" font-semibold  mt-3">Current status :</h3>
          <div className=" pl-6 mt-2">
            <p className=" text-sm">
              Package Balance :{" "}
              <span className="text-[#38BDEF] font-semibold">
                {usageData?.providerInfo?.data?.balance}
              </span>
            </p>
          </div>
        </div>
      )}

      {searchParams?.orderId && !usageData && (
        <>
          <div className=" w-full">
            <h1 className=" text-red-600 font-medium">Order is Incomplete </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Usage;
