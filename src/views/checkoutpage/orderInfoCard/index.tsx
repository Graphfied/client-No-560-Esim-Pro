import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { GoClock } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import esimIcon from "../../../../public/navbar/esim.svg";
import CountDown from "../countDown";

export default function OrderInfoCard({
  data,
  searchParams,
  rewardsPercentage,
  handleCountdownEnd,
}: {
  data: any;
  searchParams: {
    id: string;
    price: string;
    cashback: string;
    balance?: string;
  };
  rewardsPercentage: {
    id?: string;
    reward?: string;
    cashbackpercent?: string;
    discountpercent?: string;
  };
  handleCountdownEnd: (id?: string) => void;
}) {
  const discount_percentage_backend: any = parseFloat(
    rewardsPercentage?.discountpercent!
  ).toString();
  // console.log("Data", data)
  // console.log("Inside OrderInfo Card ----> ",searchParams?.price);
  // Calculate discounted price
  // const discountedPrice = searchParams.price
  //   ? (parseFloat(data[0]?.retailPrice) * 0.97).toFixed(2)
  //   : data[0]?.retailPrice;
  // Calculate discounted price based on the backend discount percentage
  const discountedPrice = searchParams.price
    ? (
        parseFloat(data[0]?.retailPrice) *
        (1 - discount_percentage_backend / 100)
      ).toFixed(2)
    : data[0]?.retailPrice;

  // Calculate total price after deduction
  // const totalPriceAfterDeduction = searchParams.balance
  //   ? (
  //       parseFloat(
  //         searchParams.price ? discountedPrice : data[0]?.retailPrice
  //       ) - parseFloat(searchParams.balance)
  //     ).toFixed(2)
  //   : searchParams.price
  //   ? discountedPrice
  //   : data[0]?.retailPrice;
  // Calculate total price after deduction
  const totalPriceAfterDeduction = searchParams.balance
    ? parseFloat(searchParams.balance) >=
      parseFloat(searchParams.price ? discountedPrice : data[0]?.retailPrice)
      ? data[0]?.retailPrice // Set to zero or handle it accordingly
      : (
          parseFloat(
            searchParams.price ? discountedPrice : data[0]?.retailPrice
          ) - parseFloat(searchParams.balance)
        ).toFixed(2)
    : searchParams.price
    ? discountedPrice
    : data[0]?.retailPrice;

  // get Retail Price from Data
  const retailPrices = data.map((item: any) => item.retailPrice);

  // Calculate Saved Price for each item
  // const savedPrices = retailPrices.map((price : any) => price - parseFloat(discountedPrice));
  // Calculate Saved Price for each item as strings
  const savedPrices = retailPrices.map((price: any) =>
    (price - parseFloat(discountedPrice)).toFixed(2)
  );
  // console.log("🚀 ~ savedPrices:", savedPrices);

  return (
    <div className="w-full lg:max-w-[30%] mt-10 lg:mt-0 px-5">
      {/* Heading */}
      <div className="flex items-end justify-between mb-1">
        <p className="text-[15px]">Order Summary</p>
        <p className="text-xs">
          <GoClock className="inline mr-1" />
          session expires in{" "}
          <span className="font-medium">
            <CountDown onCountdownEnd={handleCountdownEnd} /> minutes
          </span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white p-4 rounded-lg">
        {/* Provider Logo - Product Title - Price */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-x-1 w-[70%]">
            <Image
              src={data[0]?.providerLogo}
              alt={"providerlogo"}
              width={25}
              height={25}
            />
            <p className="text-[15px] truncate">
              {data[0]?.productDetails?.product_Title}
            </p>
          </div>
          <p className="text-lime-500 text-[15px] text-nowrap">
            {data[0]?.currencyCode} {data[0]?.retailPrice}
          </p>
        </div>

        <Separator className="bg-gray-200" />

        {/* Esim - Free */}
        <div className="flex items-center justify-between py-4">
          <div className="flex gap-x-1">
            <Image src={esimIcon} alt="icon" width={20} height={20} />
            <p className="text-[15px]">eSIM</p>
          </div>
          <p className="text-lime-500 text-[15px]">FREE</p>
        </div>

        <Separator className="bg-gray-200" />

        {/* Total - Price */}
        <div className="flex items-center justify-between py-4">
          <p className="text-[15px]">
            <MdOutlineShoppingCart className="inline mr-1" size={20} />
            Total
          </p>
          <p className="text-lime-500 text-[15px]">
            {/* {data[0]?.currencyCode} {data[0]?.retailPrice} */}

            {searchParams.price || searchParams.balance ? (
              <>
                <span className="text-gray-500 line-through font-medium">
                  {data[0]?.currencyCode} {data[0]?.retailPrice}
                </span>{" "}
                {data[0]?.currencyCode} {totalPriceAfterDeduction}
              </>
            ) : null}

            {!searchParams.price && !searchParams.balance && (
              <>
                {data[0]?.currencyCode} {totalPriceAfterDeduction}
              </>
            )}
          </p>
        </div>

        <Separator className="bg-gray-200" />

        {/* Balance */}
        {/* {searchParams.balance && (
          <div className="flex items-center justify-between py-4">
            <p className="text-[15px]">Your Balance</p>
            <p className="text-lime-500 text-[15px]">
              - {data[0]?.currencyCode} {searchParams.balance}
            </p>
          </div>
        )} */}

        {/* Reward */}
        <div className="flex items-center justify-between pt-4 gap-x-1">
          <CiGift size={35} />
          {searchParams?.id &&
            !searchParams?.price &&
            !searchParams?.cashback && (
              <p className="text-[15px]">
                Both you and your refererer earn $5.00 MobiMatter Rewards with
                this purchase
              </p>
            )}

          {searchParams?.cashback && (
            <p className=" text-[15px]">
              Earn ${searchParams?.cashback} MobiMatter Rewards with this
              purchase
            </p>
          )}

          {searchParams?.price && (
            <p>
              We have applied a {discount_percentage_backend}% discount, you
              save ${savedPrices}!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// {searchParams.price && (
//   <>
//     <span className="text-gray-500 line-through font-medium">
//       {data[0]?.currencyCode} {data[0]?.retailPrice}
//     </span>{" "}
//     {/* {data[0]?.currencyCode} {discountedPrice}  */}
//     {data[0]?.currencyCode} {totalPriceAfterDeduction}
//   </>
// )}

// {searchParams.balance && (
//   <>
//     <span className="text-gray-500 line-through font-medium">
//       {data[0]?.currencyCode} {data[0]?.retailPrice}
//     </span>{" "}
//     {/* {data[0]?.currencyCode} {discountedPrice}
//     // {data[0]?.currencyCode} {totalPriceAfterDeduction} */}
//   </>
// )}
