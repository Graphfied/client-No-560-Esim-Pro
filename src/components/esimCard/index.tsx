"use client";
import Image from "next/image";
import fiveG from "/public/homepage/esimCard/fiveg.svg";
import globe from "/public/homepage/esimCard/globe.svg";
import snow from "/public/homepage/esimCard/snow.svg";
import badge from "/public/homepage/esimCard/badge.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IProductsProps } from "@/app/(main)/esim/[search]/page";
import { addOrderRecord } from "@/actions/addOrderRecord";
import { useRouter } from "next/navigation";
// import getCurrentUser from "@/actions/getCurrentUser";
import { CreateOrder } from "@/actions/createOrder";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "../navbar";

export default function EsimCard({
  data,
  country,
  buttonText,
  buttonLink,
  currentUser,
  merchantId,
}: {
  data?: IProductsProps;
  country?: any;
  buttonText?: string;
  buttonLink?: any;
  currentUser?: User;
  merchantId?: string;
}) {
  // console.log("Data inside esim card", data?.productCategory);
  const [open, setOpen] = useState(false);
  const [topupOrderNumber, setTopupOrderNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const router = useRouter();
  const productId = data?.productId;
  // const currentUser = await getCurrentUser();
  // get Three Countries for displaying flags
  const threeCountries = data?.countries
    .map((item: any) => ({
      cca: item,
    }))
    .slice(0, 3);

  // Find matching countries in the 'country' array
  const threeCountriesFlag = threeCountries
    ?.map((threeCountry: any) => {
      const matchingCountry = country?.find(
        (countryItem: any) => countryItem.cca2 === threeCountry.cca
      );
      return matchingCountry ? { ...matchingCountry } : null;
    })
    .filter(Boolean);

  // Calculate validity in days
  const validityInHours: any = data?.productDetails?.product_validity;
  const validityInDays = Math.ceil(validityInHours / 24); // Round up to the nearest day

  // product Tags
  const tags = data?.productDetails?.product_tags?.map((item: any) => ({
    tag: item.item,
  }));

  let createOrderResponse: any;

  const topupCreateOrder = async () => {
    try {
      setTopUpLoading(true);
      createOrderResponse = await CreateOrder({
        productId: productId,
        // productId: "7eb84156-4a60-49d9-8a61-db1445e910f0",
        productCategory: data?.productCategory,
        // addOnOrderIdentifier: "WOW-2406483",
        addOnOrderIdentifier: topupOrderNumber,
      });
      // console.log("Create Order Id for topup: ", createOrderResponse);

      if (createOrderResponse?.statusCode !== 200) {
        setError(createOrderResponse?.message);
        console.log("Error creating order:", createOrderResponse?.message);
      } else {
        await addOrderRecord({
          userid: currentUser?.userid,
          orderid: createOrderResponse?.result?.orderId,
          // orderid: "ABCDtop",
          orderstate: "Created",
          // merchantid: process.env.MOBI_MERCHANT_ID as string,
          merchantid: merchantId,
          currencycode: data?.currencyCode,
          createdtime: data?.created,
          updatedtime: data?.updated,
          productid: productId,
          productcategory: data?.productCategory,
          cost: data?.retailPrice as any,
          // cost: (price / 100).toFixed(2),
          title: data?.productDetails?.product_Title,
          provider: data?.providerName,
          providerid: data?.providerId,
          providername: data?.providerName,
          providerlogo: data?.providerLogo,
          qrcode: "",
          phone: "",
          isrefundable: false,
          accesspointname: "",
          activationcode: "",
          smdpaddress: "",
          activationinstructions: "",
        });

        // Update buttonLink with the orderId
        updatedButtonLink = `${buttonLink.pathname}?id=${buttonLink.query.id}&orderId=${createOrderResponse?.result?.orderId}`;
        // updatedButtonLink = `${buttonLink.pathname}?id=${buttonLink.query.id}&orderId=ABCDtop`;
        // console.log("Updated Button Link: ", updatedButtonLink);
        router.push(updatedButtonLink);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setOpen(false);
      setTopUpLoading(false);
    }
  };

  // let handleOrderFunction: any;
  let updatedButtonLink;

  // Function for Creating Order
  const handleOrderFunction = async () => {
    if (data?.productCategory === "esim_addon") {
      // open modal
      setOpen(true);
    } else {
      try {
        setIsLoading(true);
        createOrderResponse = await CreateOrder({
          productId: productId,
        });
        // console.log("Create Order Id for realtime: ", createOrderResponse);
        if (createOrderResponse?.statusCode !== 200) {
          setError(createOrderResponse?.message);
          console.log("Error creating order:", createOrderResponse?.message);
        } else {
          await addOrderRecord({
            userid: currentUser?.userid,
            orderid: createOrderResponse?.result?.orderId,
            // orderid: "ABCDreal",
            orderstate: "Created",
            // merchantid: process.env.MOBI_MERCHANT_ID as string,
            merchantid: merchantId,
            currencycode: data?.currencyCode,
            createdtime: data?.created,
            updatedtime: data?.updated,
            productid: productId,
            productcategory: data?.productCategory,
            cost: data?.retailPrice as any,
            // cost: (price / 100).toFixed(2),
            title: data?.productDetails?.product_Title,
            provider: data?.providerName,
            providerid: data?.providerId,
            providername: data?.providerName,
            providerlogo: data?.providerLogo,
            qrcode: "",
            phone: "",
            isrefundable: false,
            accesspointname: "",
            activationcode: "",
            smdpaddress: "",
            activationinstructions: "",
          });
          // Update buttonLink with the orderId

          updatedButtonLink = `${buttonLink.pathname}?id=${buttonLink.query.id}&orderId=${createOrderResponse?.result?.orderId}`;
          // updatedButtonLink = `${buttonLink.pathname}?id=${buttonLink.query.id}&orderId=ABCDreal`;
          // console.log("Updated Button Link: ", updatedButtonLink);
          router.push(updatedButtonLink);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white w-full xl:h-[186px] rounded-md shadow-sm p-3">
      {/* Logo - Package - tag */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-x-2">
          {/* Logo */}
          <Image
            src={data?.providerLogo!}
            alt="logo"
            width={23}
            height={23}
            className="mt-2"
          />
          {/* Package and Company */}
          <div>
            <p className="text-[#1A202C] text-sm font-medium">
              {data?.productDetails?.product_Title}
            </p>
            <p className="text-[#8A8D92] text-[10px]">{data?.providerName}</p>
          </div>
        </div>
        {/* Tag */}
        <div className="flex flex-col items-end">
          {tags?.map((item: any, index: any) => (
            <div key={index} className="">
              {item.tag === "BEST COVERAGE" || item.tag === "BEST QUALITY" ? (
                <span className="uppercase text-[10px] text-[#8A8D92] flex items-center">
                  <Image
                    src={badge}
                    alt="best"
                    width={10}
                    height={10}
                    className="mr-1"
                  />
                  {item.tag}
                </span>
              ) : item.tag === "❄️Winter Special" ||
                item.tag === "24 HR PASS" ? (
                <span className="uppercase text-[10px] text-[#8A8D92] flex items-center">
                  <Image
                    src={snow}
                    alt="best"
                    width={10}
                    height={10}
                    className="mr-1"
                  />
                  {item.tag}
                </span>
              ) : (
                <span> </span>
              )}
            </div>
          ))}
          {/* {data.tag === "BEST COVERAGE" || data.tag === "BEST QUALITY" ? (
            <span className="uppercase text-[10px] text-[#8A8D92] flex items-center">
              <Image
                src={badge}
                alt="best"
                width={10}
                height={10}
                className="mr-1"
              />
              {data.tag}
            </span>
          ) : data.tag === "❄️Winter Special" ? (
            <span className="uppercase text-[10px] text-[#8A8D92] flex items-center">
              <Image
                src={snow}
                alt="best"
                width={10}
                height={10}
                className="mr-1"
              />
              {data.tag}
            </span>
          ) : (
            <span> </span>
          )} */}
          {/* Network */}
          {data?.productDetails?.product_FIVEG === "1" ? (
            <Image src={fiveG} alt="5G" width={22} height={22} />
          ) : null}
        </div>
      </div>

      {/* Validity - Data - Price */}
      <div className="flex justify-between items-center mt-3">
        {/* Validity */}
        <div>
          <p className="text-[#1A202C] text-xs">Validity:</p>
          <p className="text-[15px] font-medium text-[#38BDEF]">
            {validityInDays} days
          </p>
        </div>
        {/* Data */}
        <div className="">
          <p className="text-[#1A202C] text-xs">Data:</p>
          <p className="text-[15px] font-medium text-[#38BDEF]">
            {data?.productDetails?.product_data_limit}{" "}
            {data?.productDetails?.product_data_unit}
          </p>
        </div>
        {/* Price */}
        <div>
          <p className="text-[#1A202C] text-xs">Price:</p>
          <p className="text-[15px] font-medium text-[#24B502]">
            {data?.retailPrice}
          </p>
        </div>
      </div>

      {/* Works in countries */}
      <div className="flex items-end mt-3 gap-x-2">
        <Image src={globe} alt="logo" width={18} height={18} />
        <p className="text-xs font-medium">
          Works in{" "}
          <span className="space-x-0.5">
            {threeCountriesFlag?.map((item: any) => (
              <Image
                src={item.flag}
                alt="flag"
                height={16}
                width={16}
                key={item.name}
                className="inline rounded-[2px] h-3 w-4"
              />
            ))}{" "}
            and {data?.countries?.length} more destinations
          </span>
        </p>
      </div>

      {/* View Offer Button */}
      {/* Button */}
      {buttonText === "Buy Now" ? (
        <>
          <Button
            disabled={isLoading}
            onClick={() => handleOrderFunction()}
            className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] mt-3"
            size="sm"
          >
            {/* <Link href={buttonLink} className="w-full"> */}
            {/* {buttonText} */}
            {isLoading ? "Loading..." : buttonText}
            {/* </Link> */}
          </Button>
        </>
      ) : (
        <>
          <Button
            className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] mt-3"
            size="sm"
          >
            <Link href={buttonLink} className="w-full">
              {buttonText}
            </Link>
          </Button>
        </>
      )}

      {/* Modal */}
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter Order Number</DialogTitle>
              <DialogDescription>
                Enter order number of associated eSIM
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <input
                  value={topupOrderNumber}
                  onChange={(e) => setTopupOrderNumber(e.target.value)}
                  placeholder="Enter order number"
                  className="col-span-3 p-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={topUpLoading}
                onClick={() => {
                  topupCreateOrder();
                }}
              >
                {topUpLoading ? "Loading..." : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-red-600 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
