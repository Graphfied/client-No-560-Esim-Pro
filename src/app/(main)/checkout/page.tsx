"use client";
import { getDynamicProducts } from "@/actions/getDynamicProducts";
import { getFormattedProductsArray } from "@/utils/FormattedProductsArray";
import OrderInfoCard from "@/views/checkoutpage/orderInfoCard";
import TopBar from "@/views/checkoutpage/topBar";
import { RewardSection } from "@/views/checkoutpage/RewardSection";
import getCurrentUser from "@/actions/getCurrentUser";
import { CreateOrder } from "@/actions/createOrder";
import { getAdminRewards } from "@/actions/getAdminRewards";
import { useEffect, useState } from "react";
import { BsEmojiAstonished } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CancelOrderFromMobi } from "@/actions/cancelOrder";
import { UpdateOrderState } from "@/actions/updateOrderState";
import { ImSpinner6 } from "react-icons/im";

interface CheckoutProps {
  searchParams: {
    id: string;
    price: string;
    cashback: string;
    orderId: string;
  };
}
export default function Checkout({ searchParams }: CheckoutProps) {
  const productId = searchParams?.id;
  const orderId = searchParams?.orderId;
  const [FormattedData, setFormattedData] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSessionExpired, setSessionExpired] = useState(false);
  const [rewardsPercentage, setRewardsPercentage] = useState<any>({});
  const [createOrder, setCreateOrder] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting to fetch data
        setLoading(true);

        // Fetch dynamic products
        const data = await getDynamicProducts({ productId });
        const formattedData = getFormattedProductsArray({
          products: data,
        });
        setFormattedData(formattedData);

        // Get current user
        const currentUser: any = await getCurrentUser();
        setCurrentUser(currentUser);

        // Get reward table data
        const getRewardsPercentage: any = await getAdminRewards();
        setRewardsPercentage(getRewardsPercentage);
        // console.log(" ~ Checkout ~ rewardsPercentage:", rewardsPercentage);

        // Set loading to false when data is fetched
        setLoading(false);

        // Create order
        // const createOrder = await CreateOrder({
        //   productId: productId,
        // });
        // setCreateOrder(createOrder);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchData(); // Call the inner function to execute the asynchronous code
  }, [productId, createOrder]);

  useEffect(() => {
    const checkSessionExpiration = () => {
      const interval = setInterval(() => {
        if (isSessionExpired) {
          clearInterval(interval); // Stop the interval
          // Perform actions when session expires, e.g., trigger a rerender
          // or navigate to a different page
          handleCountdownEnd(orderId as string);
        }
      }, 10000); // Check every second for session expiration

      // Cleanup the interval when the component unmounts
      return () => clearInterval(interval);
    };

    checkSessionExpiration();
  }, [isSessionExpired, orderId]);
  // Create Order in Mobimatter
  // const createOrder = await CreateOrder({
  // productId: productId,
  // });
  // console.log("Create Order ----> ", createOrder);

  // const data = await getDynamicProducts({ productId });
  // const formattedData = getFormattedProductsArray({
  //   products: data,
  // });
  // const currentUser: any = await getCurrentUser();
  // const dotenv = require("dotenv");
  // dotenv.config();
  // get Rewards percentage Data
  // const rewardsPercentage: any = await getAdminRewards();
  // console.log("🚀 ~ Checkout ~ rewardsPercentage:", rewardsPercentage[1]);
  // const rewardsPercentage = [
  //   {},
  //   {
  //     id: "5",
  //     reward: "0.0",
  //     cashbackpercent: "15.0",
  //     discountpercent: "50.0",
  //   },
  // ];

  const handleCountdownEnd = (id: any) => {
    // Perform actions when the countdown reaches 0
    // console.log("Countdown reached 0. Session has ended.");
    setSessionExpired(true);
    CancelOrderFromMobi({
      // orderId: createOrder?.orderId,
      orderId: id,
      reason: "Session expired",
    });
    UpdateOrderState({
      orderId: id,
      state: "Cancelled",
    });
  };
  return loading ? (
    // Display loader while data is being fetched
    <div className="w-full h-[80dvh] flex flex-col items-center justify-center">
      <ImSpinner6
        size={50}
        className="animate-spin stroke-[0.5] text-[#38BDEF]"
      />
      <p className="font-medium text-xl text-[#38BDEF] mt-3">
        Loading eSIM details
      </p>
    </div>
  ) : isSessionExpired ? (
    <div className="flex flex-col gap-y-3 h-[75dvh] w-full items-center justify-center">
      <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
      <h2 className="text-3xl font-medium">Session has expired</h2>
      {/* Return Button */}
      <Link href="/" className="my-5 block">
        <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
          Back to Home
        </Button>
      </Link>
    </div>
  ) : (
    <div>
      <TopBar />
      <div className="max-w-[1350px] flex flex-col lg:flex-row mx-auto">
        <RewardSection
          data={FormattedData[0]}
          currentUser={currentUser}
          createdOrderId={searchParams?.orderId}
          rewardsPercentage={rewardsPercentage[0]}
        />
        <OrderInfoCard
          data={FormattedData}
          searchParams={searchParams}
          rewardsPercentage={rewardsPercentage[0]}
          handleCountdownEnd={handleCountdownEnd}
        />
      </div>
    </div>
  );
}
