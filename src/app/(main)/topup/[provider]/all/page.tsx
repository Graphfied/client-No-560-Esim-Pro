import Image from "next/image";
import React from "react";
import surfer from "/public/surfer.png";
import { getCountriesData } from "@/utils/getCountriesdata";
import { getProviderDetails } from "@/actions/getProviderDetails";
import { ToggleButton } from "@/components/ToggleButton";
import { TopUpAllSelect } from "@/components/Topup-All-Page/TopUpAllSelect";

const AllPage = async ({ params }: { params: { provider: string } }) => {
  // console.log("🚀 ~ file: page.tsx:17 ~ params:", params.provider);
  const optionsData: any = await getCountriesData();

  const allProviderDetails = await getProviderDetails();

  // Creating an object to map provider names to logos
  const providerNamesWithLogos: {
    logo: string;
    label: string;
    value: string;
  }[] = [];

  allProviderDetails.forEach((item: any) => {
    const { providerName, providerLogo } = item;

    // Ensure the providerName is not already in the object
    if (!providerNamesWithLogos[providerName]) {
      providerNamesWithLogos[providerName] = {
        logo: providerLogo,
        label: providerName,
        value: providerName,
      };
    }
  });

  // Extracting an array of objects with unique provider names and logos
  const uniqueProvidersWithLogos = Object.values(providerNamesWithLogos);

  return (
    <>
      <div className=" relative w-full h-56">
        <Image src={surfer} alt={"hero_image"} fill className="object-cover" />
        <div className=" absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]">
          <h2 className="absolute flex justify-start w-36 sm:w-auto -top-12 -left-10 sm:-top-9 sm:-left-6 md:-top-10 md:-left-9 lg:-top-10 lg:left-0 xl:-top-12 xl:left-6 2xl:-top-12 2xl:left-6 3xl:-top-12 3xl:left-10   text-white text-base  sm:text-lg md:text-xl font-semibold mb-3  text-center ">
            Shop for eSIM topups
          </h2>
          <ToggleButton />

          <TopUpAllSelect
            providerName={params.provider}
            optionData={optionsData}
            providers={uniqueProvidersWithLogos}
          />
        </div>
      </div>
    </>
  );
};

export default AllPage;
