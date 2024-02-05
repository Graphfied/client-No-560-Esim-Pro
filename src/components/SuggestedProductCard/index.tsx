import { IProductsProps } from "@/app/(main)/esim/[search]/page";
import Image from "next/image";
import React from "react";
import fiveG from "../../../public/homepage/esimCard/fiveg.svg";
import globe from "/public/homepage/esimCard/globe.svg";
import snow from "../../../public/homepage/esimCard/snow.svg";
import badge from "../../../public/homepage/esimCard/badge.svg";
import Link from "next/link";

export const SuggestedProductCard = ({
  data,
  buttonLink,
}: {
  data?: IProductsProps;
  country?: any;
  buttonText?: string;
  buttonLink?: any;
}) => {
  // Calculate validity in days
  const validityInHours: any = data?.productDetails?.product_validity;
  const validityInDays = Math.ceil(validityInHours / 24); // Round up to the nearest day
  // console.log("Suggested Validity ---->  ", validityInDays);

  // product Tags
  const tags = data?.productDetails?.product_tags?.map((item: any) => ({
    tag: item.item,
  }));

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm p-3">
      <Link href={buttonLink}>
        {/* Logo - Package -Tag */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-x-2">
            {data?.providerLogo && data?.providerLogo.trim() !== "" && (
              <>
                {/* Logo */}
                <Image
                  src={data?.providerLogo!}
                  alt="logo"
                  width={23}
                  height={23}
                  className="mt-2"
                />
              </>
            )}

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

          {/* Price */}
          <div>
            <p className="text-[#1A202C] text-xs">Price:</p>
            <p className="text-[15px] font-medium text-[#24B502]">
              {data?.retailPrice}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
