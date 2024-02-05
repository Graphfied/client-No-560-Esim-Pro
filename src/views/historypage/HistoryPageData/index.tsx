import Image from "next/image";
import Link from "next/link";

interface HistoryPageDataProps {
  data: any;
  searchParams: any;
}
export const HistoryPageData = ({
  data,
  searchParams,
}: HistoryPageDataProps) => {
  // data filter for eSIMs products
  const subtype = searchParams.subType;
  if (subtype === "esims") {
    data = data.filter((item: any) => item.productcategory === "esim_realtime");
  }

  // data filter for topups products
  if (subtype === "topups") {
    data = data.filter((item: any) => item.productcategory === "esim_addon");
  }

  if (searchParams.type === "esim") {
    data = data.filter((item: any) => item.productcategory === "esim_realtime");
  }

  if (subtype === "all") {
    data = data;
  }

  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white rounded-md p-3 w-full"
            >
              {/* Provider and Link */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Image
                    src={item.providerlogo}
                    alt={"logo"}
                    width={35}
                    height={35}
                  />
                  <div className="ml-2">
                    <p className="text-xs text-txtgrey">Provider</p>
                    <p className="text-xs font-medium">{item.provider}</p>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/esimInfo/${item.productid}`}
                    className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] text-xs py-1 px-2 rounded-sm transition-all duration-300 text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Order Number - Date - Phone Number */}
              <div className="flex items-center justify-between w-full mt-3">
                {/* order */}
                <div>
                  <p className="text-xs text-txtgrey">Order Number</p>
                  <p className="text-xs font-medium">{item.orderid}</p>
                </div>
                {/* Date */}
                <div>
                  <p className="text-xs text-txtgrey">Date</p>
                  <p className="text-xs font-medium">
                    {new Date(item.updatedtime).toLocaleDateString()}
                  </p>
                </div>
                {/* Phone Number  */}
                <div>
                  <p className="text-xs text-txtgrey">Phone Number</p>
                  <p className="text-xs font-medium">{item.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <p className="font-semibold">You have no eSIMs</p>
            <p className="text-center">
              Your rechargeable eSIMs will be shown here when you buy them
            </p>
          </div>
          <Image alt="" height={200} width={200} src="/profile/card.svg" />
        </>
      )}
    </>
  );
};
