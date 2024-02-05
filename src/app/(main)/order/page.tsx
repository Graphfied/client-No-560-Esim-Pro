import Image from "next/image";
import { PiWarningDiamond } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { addOrderRecord, addOrderRecordProps } from "@/actions/addOrderRecord";
import { checkFirstPurchase } from "@/actions/checkFirstPurchase";
// import setRewardBalanceOnRefCode from "@/actions/setRewardBalanceOnRefCode";
import { getOrderHistoryByOrderId } from "@/actions/getOrderHistoryByOrderId";
import { BsEmojiAstonished } from "react-icons/bs";
import { UpdateOrderState } from "@/actions/updateOrderState";
import { AddCashBackBonus } from "@/actions/addCashbackBonus";
import { DeductBalanceFromUserWallet } from "@/actions/deductBalanceFromWallet";
import getCurrentUser from "@/actions/getCurrentUser";
import { AddRewardInTable } from "@/actions/AddRewardinTable";
import { CompleteOrderFromMobi } from "@/actions/completeOrder";
import { LineItems, extractLineItemDetails } from "@/utils/orderPageTypes";
import { UpdateCompleteOrderInDatabase } from "@/actions/UpdateCompleteOrder";
import { mailOptions, transporter } from "@/lib/nodeMailer";

let cashbackProcessed = false; // Add this variable outside the component
var balanceDeductOfUser = false; // Add this variable outside the component
var addRewardinTable = false;

const OrderPage = async ({
  searchParams,
}: {
  searchParams: {
    orderid: string;
    validCode?: number;
    cashback?: string;
    balance?: string;
    price?: any;
  };
}) => {
  const currentUser = await getCurrentUser();

  ///////////////////////////////////////////////////////////

  // SENDING ORDER ID IN MOBIMATTER FOR COMPLETE ORDER-ID;
  const completeDOrder: any = await CompleteOrderFromMobi({
    orderId: searchParams?.orderid,
  });

  // console.log("Complete Order -----> ", completeDOrder);
  if (completeDOrder === undefined) {
    return (
      <div className="flex flex-col gap-y-3 h-[80dvh] w-full items-center justify-center">
        <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
        <h2 className="text-2xl md:text-3xl font-medium px-10 text-center">
          Order not completed. Something went wrong
        </h2>
        {/* Return Button */}
        <Link href="/" className="my-5 block">
          <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // UPDATE DATABASE WITH COMPLETE ORDER DATA
  const lineItems: LineItems = extractLineItemDetails(
    completeDOrder?.result?.orderLineItem
  );

  await UpdateCompleteOrderInDatabase({
    orderid: searchParams?.orderid,
    orderstate: "Completed",
    qrcode: lineItems?.qrCode,
    phone: lineItems?.phoneNumber,
    isrefundable: true,
    accesspointname: lineItems?.accessPointName,
    activationcode: lineItems?.activationCode,
    smdpaddress: lineItems?.smdpAddress,
    activationinstructions: lineItems?.activationInstructions,
    price: searchParams?.price,
  });

  // Fetch Order History From Order Id
  const specificOrderId: any = await getOrderHistoryByOrderId(
    searchParams?.orderid
  );

  ///////////////////////////////////////////////////////////

  await UpdateOrderState({
    orderId: searchParams?.orderid,
    state: "Completed",
  });
  // console.log("Updated State -----> ", updateOrderState);

  // const { title, providerLogo, providerName } =
  // completedOrder?.result?.orderLineItem;
  // const { orderId } = completedOrder?.result;
  // const orderDate = new Date(completedOrder.result.updated);
  // const formattedDate = orderDate.toLocaleString();
  // const qrCode: any =
  //   completedOrder?.result?.orderLineItem?.lineItemDetails?.find(
  //     (detail) => detail?.name === "QR_CODE"
  //   )?.value;
  // const phoneNumber =
  //   completedOrder?.result?.orderLineItem?.lineItemDetails?.find(
  //     (detail) => detail?.name === "PHONE_NUMBER"
  //   )?.value;
  // const accessPointName =
  //   completedOrder?.result?.orderLineItem?.lineItemDetails?.find(
  //     (detail) => detail?.name === "ACCESS_POINT_NAME"
  //   )?.value;

  // Function to format date
  let formatDateTime: any;
  if (searchParams?.orderid !== "undefined") {
    formatDateTime = (dateTimeString: string) => {
      const options: any = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options)?.format(
        new Date(dateTimeString)
      );
    };
  }

  // this function will check the First Purchase Boolean and assign the referral code

  if (searchParams?.validCode && !addRewardinTable) {
    await AddRewardInTable({
      type: "Added",
      amount: "5",
      datetime: new Date().toDateString(),
      email: currentUser.email,
    });
    addRewardinTable = true;
  }

  if (searchParams?.validCode) {
    await checkFirstPurchase({
      referencecode: String(searchParams?.validCode),
    });
  } else {
    await checkFirstPurchase();
  }

  if (
    searchParams?.validCode &&
    searchParams?.balance &&
    !balanceDeductOfUser
  ) {
    await checkFirstPurchase({
      referencecode: String(searchParams?.validCode),
    });
    await DeductBalanceFromUserWallet(searchParams?.balance);
    balanceDeductOfUser = true;
  } else {
    await checkFirstPurchase();
  }

  if (
    searchParams?.cashback &&
    !cashbackProcessed &&
    searchParams?.balance &&
    !balanceDeductOfUser
  ) {
    await AddCashBackBonus(searchParams?.cashback);
    await DeductBalanceFromUserWallet(searchParams?.balance);
    cashbackProcessed = true;
    balanceDeductOfUser = true;
  }
  // // Check if cashback has not been processed yet
  if (searchParams?.cashback && !cashbackProcessed) {
    // Mark the flag to indicate that cashback has been processed
    await AddCashBackBonus(searchParams?.cashback);
    cashbackProcessed = true;

    // Process the cashback
  }

  if (searchParams?.balance && !balanceDeductOfUser) {
    await DeductBalanceFromUserWallet(searchParams?.balance);
    balanceDeductOfUser = true;
  }

  // if (searchParams?.cashback) {
  //   await AddCashBackBonus(searchParams?.cashback);
  // }

  // SENDING EMAIL TO SPECIFIC USER ABOUT UPDATING COMPLETE ORDER.

  const emailContent = {
    to: currentUser?.email,
    subject: "Your Purchase Confirmation",
    attachedDataUrls: true,
    html: `<h3>Thank you for your purchase.</h3>
      <div> <div/>
      <p>Package: ${specificOrderId[0]?.providername}</p>
      <p>Price: ${searchParams?.price!}</p>

      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        body {
          max-width: 720px;
          font-family: "Poppins", sans-serif;
          margin: 0 auto;
          position: relative;
        }
        .content {
          max-width: 350px;
          margin: 0 auto;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 16px;
          margin-top: 20px;
        }
        h3 > span:nth-of-type(1) {
          font-weight: bold;
          color: #333333;
        }
        h3 {
          text-align: left;
          color: #6f6f6f;
          font-size: 13px;
        }
        h1 {
          font-size: 32px;
          color: #333333;
          margin: 30px 0;
        }
        .qrcode {
          border: solid 1px #333333;
          border-radius: 16px;
          width: 150px;
          height: 150px;
          position: relative;
          margin: 0 auto;
          margin-top: 30px;
        }
        .qrcode img {
          width: 150px;
          height: 150px;
          display: inline-block;
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 1rem;
          transform: translate(-50%, -50%);
        }
        h4 {
          font-weight: normal;
          font-size: 13px;
          text-align: center;
          margin-top: 8px;
          margin-bottom: 100px;
        }
        .bottom {
          text-align: center;
          font-size: 13px;
        }
        .bottom .info {
          margin-top: 8px;
        }
        .bottom .info p:nth-of-type(2) {
          font-family: "Courier New", sans-serif;
          word-wrap: break-word;
        }
      </style></head>

      <body>
      <div class="content">
          <h3> eSIM Data Plan </h3>
          <h1> ${specificOrderId[0]?.title} </h1>
          <h3>
            <span>Activate Before: </span>
            <span>${specificOrderId[0]?.activationinstructions}</span>
          </h3>
          <div class="qrcode">
            <img src="cid:unique@nodemailer.com" alt="" srcset="">
          </div>
          <h4> Multiple use installation code </h4>
          <div class="bottom">
            <div>Manual Entry Details</div>
            <div class="info">
              <p> SM-DP+Address:</p>
              <p>${specificOrderId[0]?.smdpaddress}</p>
            </div>
            <div class="info">
              <p> Activation Code:</p>
              <p>${specificOrderId[0]?.activationcode}</p>
            </div>
          </div>
        </div>
      </body>
    `,
    attachments: [
      {
        filename: "QR.png",
        path: lineItems?.qrCode,
        // path: specificOrderId[0]?.qrcode,
        cid: "unique@nodemailer.com",
      },
    ],
  };

  const finalMailOptions: any = { ...mailOptions, ...emailContent };

  await new Promise((resolve, reject) => {
    transporter.sendMail(finalMailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Email error:", error);
        reject(error);
      } else {
        // console.log("Email sent:", info?.response);
        resolve(info);
      }
    });
  });

  /////////////////////////////////////////////////////////////////////

  // WORKING CODE FOR COMPLETE ORDER PROCESS....

  return (
    <>
      <div className="max-w-2xl mx-auto my-5 px-3">
        {searchParams?.orderid && searchParams?.orderid !== "undefined" ? (
          <>
            <h2 className="font-semibold">Your eSIM</h2>
            {/* Top Card */}
            <div className="my-3 bg-white w-full p-2 rounded-md">
              {/* QR */}
              <Image
                src={lineItems?.qrCode!}
                alt="QR"
                width={180}
                height={180}
                className="object-contain mx-auto"
              />

              {/* Title */}
              <h2 className="text-center font-bold">
                {specificOrderId[0]?.title}
              </h2>

              {/* Provider Logo and Name */}
              <div className="flex items-center justify-center gap-y-1 mt-2">
                <Image
                  src={specificOrderId[0]?.providerlogo as any}
                  alt="logo"
                  width={20}
                  height={20}
                />
                <p className="text-txtgrey text-sm ml-2">
                  {specificOrderId[0]?.provider}
                </p>
              </div>

              {/* Order Number and Date */}
              <div className="flex items-center justify-between">
                {/* Order Number */}
                <div className="text-left">
                  <p className="text-txtgrey">Order #</p>
                  <p className="text-gray-800 text-sm font-medium">
                    {specificOrderId[0]?.orderid}
                  </p>
                </div>

                {/* Date */}
                <div className="text-right">
                  <p className="text-txtgrey">Date</p>
                  <p className="text-gray-800 text-sm font-medium">
                    {formatDateTime(specificOrderId[0]?.updatedtime!)}
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-200 my-2" />

              {/*Phone number and APN*/}
              <div className="flex items-center justify-between">
                {/* Phone number */}
                <div className="text-left">
                  <p className="text-txtgrey">Phone #</p>
                  <p className="text-gray-800 text-sm font-medium">
                    {specificOrderId[0]?.phone}
                  </p>
                </div>

                {/* APN */}
                <div className="text-right">
                  <p className="text-txtgrey">APN (Access Point Name)</p>
                  <p className="text-gray-800 text-sm font-medium">
                    {specificOrderId[0]?.accesspointname}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="my-3 bg-white w-full p-2 rounded-md flex flex-col items-center justify-center gap-y-1 text-center">
              <PiWarningDiamond className="text-btnblue text-5xl" />
              <p className="font-bold text-lg">DO NOT DELETE THIS ESIM!</p>
              <p>The eSIM can be downloaded only once.</p>
            </div>

            {/* Return Button */}
            <Link href="/" className="my-5 block">
              <Button
                className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
                size="sm"
              >
                Continue shopping
              </Button>
            </Link>
          </>
        ) : (
          <>
            {/* Error UI*/}
            <div className="flex flex-col gap-y-3 h-[80dvh] w-full items-center justify-center">
              <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
              <h2 className="text-2xl md:text-3xl font-medium px-5 text-center">
                Something went wrong..
              </h2>
              {/* Return Button */}
              <Link href="/" className="my-5 block">
                <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
                  Back to Home
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderPage;

////////////////////////////////////////////////////////////////////

// WORKING CODE FOR DUMMY ORDER PROCESS.....
// return (
//   <>
//     <div className="max-w-2xl mx-auto my-5 px-3">
//       {searchParams?.orderid && searchParams?.orderid !== "undefined" ? (
//         <>
//           <h2 className="font-semibold">Your eSIM</h2>
//           {/* Top Card */}
//           <div className="my-3 bg-white w-full p-2 rounded-md">
//             {/* QR */}
//             <Image
//               src={qrCode}
//               alt="QR"
//               width={180}
//               height={180}
//               className="object-contain mx-auto"
//             />

//             {/* Title */}
//             <h2 className="text-center font-bold">
//               {/* {specificOrderId[0]?.title} */}
//               {completedOrder?.result?.orderLineItem?.title}
//             </h2>

//             {/* Provider Logo and Name */}
//             <div className="flex items-center justify-center gap-y-1 mt-2">
//               <Image
//                 src={
//                   completedOrder?.result?.orderLineItem?.providerLogo as any
//                 }
//                 alt="logo"
//                 width={20}
//                 height={20}
//               />
//               <p className="text-txtgrey text-sm ml-2">
//                 {/* {specificOrderId[0]?.provider} */}
//                 {completedOrder?.result?.orderLineItem?.provider}
//               </p>
//             </div>

//             {/* Order Number and Date */}
//             <div className="flex items-center justify-between">
//               {/* Order Number */}
//               <div className="text-left">
//                 <p className="text-txtgrey">Order #</p>
//                 <p className="text-gray-800 text-sm font-medium">
//                   {/* {specificOrderId[0]?.orderid} */}
//                   {completedOrder?.result?.orderId}
//                 </p>
//               </div>

//               {/* Date */}
//               <div className="text-right">
//                 <p className="text-txtgrey">Date</p>
//                 <p className="text-gray-800 text-sm font-medium">
//                   {/* {formatDateTime(specificOrderId[0]?.updatedtime!)} */}
//                   {completedOrder?.result?.updated}
//                 </p>
//               </div>
//             </div>

//             <Separator className="bg-gray-200 my-2" />

//             {/*Phone number and APN*/}
//             <div className="flex items-center justify-between">
//               {/* Phone number */}
//               <div className="text-left">
//                 <p className="text-txtgrey">Phone #</p>
//                 <p className="text-gray-800 text-sm font-medium">
//                   {/* {specificOrderId[0]?.phone} */}
//                   {phoneNumber}
//                 </p>
//               </div>

//               {/* APN */}
//               <div className="text-right">
//                 <p className="text-txtgrey">APN (Access Point Name)</p>
//                 <p className="text-gray-800 text-sm font-medium">
//                   {/* {specificOrderId[0]?.accesspointname} */}
//                   {accessPointName}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Card */}
//           <div className="my-3 bg-white w-full p-2 rounded-md flex flex-col items-center justify-center gap-y-1 text-center">
//             <PiWarningDiamond className="text-btnblue text-5xl" />
//             <p className="font-bold text-lg">DO NOT DELETE THIS ESIM!</p>
//             <p>The eSIM can be downloaded only once.</p>
//           </div>

//           {/* Return Button */}
//           <Link href="/" className="my-5 block">
//             <Button
//               className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
//               size="sm"
//             >
//               Continue shopping
//             </Button>
//           </Link>
//         </>
//       ) : (
//         <>
//           {/* Error UI*/}
//           <div className="flex flex-col gap-y-3 h-screen w-full items-center justify-center">
//             <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
//             <h2 className="text-3xl font-medium">Something went wrong..</h2>
//             {/* Return Button */}
//             <Link href="/" className="my-5 block">
//               <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
//                 Back to Home
//               </Button>
//             </Link>
//           </div>
//         </>
//       )}
//       {/* {searchParams?.orderid === "undefined" && (
//       <>
//         {/* Error UI*
//         <div className="flex flex-col gap-y-3 h-screen w-full items-center justify-center">
//           <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
//           <h2 className="text-3xl font-medium">Something went wrong..</h2>
//           {/* Return Button*
//           <Link href="/" className="my-5 block">
//             <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
//               Back to Home
//             </Button>
//           </Link>
//         </div>
//       </>
//     )} */}
//     </div>
//   </>
// );
