import { getDynamicProducts } from "@/actions/getDynamicProducts";
import EsimCard from "@/components/esimCard";
import { Separator } from "@/components/ui/separator";
import { getCountriesData } from "@/utils/getCountriesdata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Image from "next/image";
import { getFormattedProductsArray } from "@/utils/FormattedProductsArray";
import PopupEsimCard from "@/views/esimDetails/popupEsimCard";
import { GeneralCarousel } from "@/components/GeneralCarousel";
import { SuggestedProductCard } from "@/components/SuggestedProductCard";
import { SuggestedProductsCarouselSettings } from "@/utils/generalSettings";
import { IProductsProps } from "../../esim/[search]/page";
import getCurrentUser from "@/actions/getCurrentUser";
import { getAdminKeys } from "@/actions/getAdminKeys";

export default async function EsimDetailsEsim({
  searchParams,
}: {
  searchParams: {
    id: string;
    regionQuery: string[];
    countryQuery: string;
    providerQuery: string;
  };
}) {
  const currentUser = await getCurrentUser();
  // console.log("🚀 ~ countryQuery:", searchParams.countryQuery)
  const adminKeys: any = await getAdminKeys();
  const countries = await getCountriesData();
  const productId = searchParams.id;
  const data = await getDynamicProducts({ productId });
  const formattedData = getFormattedProductsArray({
    products: data,
  });

  const countryFlagsAndNames = data[0]?.countries?.map(
    (countryCode: string) => {
      const country = countries.find((c: any) => c.cca2 === countryCode);
      if (country) {
        return {
          code: countryCode,
          name: country.name,
          flag: country.flag,
        };
      } else {
        return {
          code: countryCode,
          name: countryCode,
          flag: "/unknownFlag.png",
        };
      }
    }
  );
  let suggestedProducts;
  // fetch 3 Products of Suggested Carousel
  if (searchParams.regionQuery) {
    suggestedProducts = await getDynamicProducts({
      region: searchParams.regionQuery as any,
      category: "esim_realtime",
    });
  } else {
    suggestedProducts = await getDynamicProducts({
      country: searchParams.countryQuery as any,
      category: "esim_realtime",
    });
  }

  let TopUpSuggestedProducts = null;
  if (searchParams.providerQuery && searchParams.countryQuery) {
    TopUpSuggestedProducts = await getDynamicProducts({
      provider: searchParams?.providerQuery as any,
      country: searchParams.countryQuery as any,
      category: "esim_addon",
    });
  }

  const threeProductsProducts = suggestedProducts.slice(0, 7);
  // console.log("threeProductsProducts --->", threeProductsProducts);

  const threeTopUpProducts = TopUpSuggestedProducts?.slice(0, 7);

  const formattedSuggestedProducts = getFormattedProductsArray({
    products: threeProductsProducts,
  });

  let formattedTopupProducts;

  if (searchParams.providerQuery) {
    formattedTopupProducts = getFormattedProductsArray({
      products: threeTopUpProducts,
    });
  }

  // Convert country codes into a string of country names
  const countryCodes = searchParams?.countryQuery?.split(",");
  const countryNames = countryCodes?.map((code) => {
    const country = countries.find((item: any) => item.cca2 === code.trim());
    return country ? country.name : "Unknown";
  });

  const concatenatedCountryNames = countryNames?.join(", ");

  // console.log(concatenatedCountryNames); // A string of country names separated by commas

  return (
    <div className="max-w-[1332px] px-5 md:px-8 mx-auto">
      {/* Esim Card */}
      <div className="flex flex-col items-center justify-center w-full md:max-w-[70%] mx-auto mt-3">
        <h3 className="text-sm font-medium mb-3">
          {formattedData[0]?.product_Title}
        </h3>
        <EsimCard
          data={formattedData[0]}
          country={countries}
          buttonText="Buy Now"
          buttonLink={{
            pathname: "/checkout",
            query: {
              id: productId,
            },
          }}
          currentUser={currentUser}
          merchantId={adminKeys[0]?.merchantid}
        />
        <PopupEsimCard
          data={formattedData[0]}
          country={countries}
          buttonLink={{
            pathname: "/checkout",
            query: {
              id: productId,
            },
          }}
          merchantId={adminKeys[0]?.merchantid}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 gap-y-8 mt-5">
        {/* Esim Details */}
        <div className="w-full md:max-w-[60%]">
          <p className="mb-3">Details</p>
          <div className="bg-white p-2 rounded-md space-y-3">
            {/* Title */}
            <p className="font-medium uppercase text-lg">
              {formattedData[0]?.productDetails.product_Title}
            </p>
            {/* Description */}
            <p className="text-sm">
              {formattedData[0]?.product_details.heading}
            </p>
            <Separator className="bg-gray-100" />
            {/* Multiline Details */}
            {formattedData[0]?.product_details?.items?.map(
              (item: any, index: number) => (
                <div key={index} className="">
                  <p className="text-[15px] leading-6 my-3">{item}</p>
                  {index !==
                    formattedData[0].product_details.items.length - 1 && (
                    <Separator className="bg-gray-100" />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full md:max-w-[40%]">
          <p className="mb-3">FAQ</p>
          <div className="bg-white rounded-md p-2">
            {/* First Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm hover:no-underline text-left">
                  Does my phone support eSIM technology?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    The sure way you can verify if your phone is compatible:
                  </p>
                  <p className="leading-6">
                    <span className="font-[450]">iPhone:</span> Go Settings
                    -&gt; Cellular (or Mobile Data). If you see &apos;Add
                    Cellular Plan&apos; or &apos;Add Mobile Plan&apos;, the
                    phone supports eSIM
                  </p>
                  <p className="leading-6">
                    <span className="font-[480]">Samsung:</span> Go Settings
                    -&gt; Go Settings -&gt; Connections -&gt; SIM Card Manager.
                    If you see &apos;Add Mobile Plan&apos;, the phone supports
                    eSIM
                  </p>
                  <p className="leading-6">
                    <span className="font-[480]">Google Pixel:</span> Go
                    Settings -&gt; Networks & Internet -&gt; SIMs -&gt;
                    &apos;+Add more&apos;. If you are using Pixel 4/4a or a
                    later model, it will be there.
                  </p>
                  <h3 className="font-[480] mt-4">IMPORTANT!</h3>
                  <p className="leading-6">
                    Some models have exceptions depending on models and markets.
                    Operator locked devices: If your device is locked to a
                    specific carrier due to a contract, it needs to be unlocked
                    first to be able to use the eSIMs sold on our platform.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Second Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm hover:no-underline text-left">
                  Can I use my physical SIM along with the eSIM?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-6">
                    Yes! With dual-SIM functionality you can have both your
                    physical SIM and eSIM active at the same time.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Third Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm hover:no-underline text-left">
                  I already have an active eSIM in my phone, can I use your
                  service?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-6">
                    Yes, your phone can store many eSIM profiles at once. You
                    can choose which one to use at in your phone settings.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Fourth Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm hover:no-underline text-left">
                  Can I use Mobile Hotspot or Tethering with my eSIM?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-6">
                    Yes! Mobile hotspot featured is enabled in all of our
                    products, except if explicitly mentioned in the product
                    details.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Reward */}
          <div className="bg-blue-950 p-3 rounded-md gap-x-2 my-4 hidden md:flex">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={80}
              height={80}
              className="shrink-0 h-8"
            />
            <p className="text-white font-[450] text-sm xl:text-base">
              Earn $0.60 MobiMatter Rewards with this purchase
            </p>
          </div>

          {/* TopUp Suggested Carousel */}
          {formattedTopupProducts && (
            <div className="my-4">
              <p className="text-lg">
                Top-Up Suggested Products for{" "}
                <span className="font-bold">
                  {searchParams?.regionQuery || concatenatedCountryNames}
                </span>
              </p>
              {/* Slider */}
              <GeneralCarousel
                settings={SuggestedProductsCarouselSettings}
                className="gap-x-3 mx-10 relative mt-3"
              >
                {formattedTopupProducts?.map(
                  (product: IProductsProps, index: number) => (
                    <div key={index} className="flex items-center">
                      <SuggestedProductCard
                        data={product}
                        country={countries}
                        buttonText="View Offer"
                        buttonLink={{
                          pathname: `/esimInfo/${product?.productDetails?.product_Title}`,
                          query: {
                            id: `${product?.productId}`,
                            // ...(searchParams?.regionQuery
                            //   ? { regionQuery: searchParams?.regionQuery }
                            //   : null),
                            ...(searchParams?.countryQuery
                              ? { countryQuery: searchParams?.countryQuery }
                              : null),
                            ...(searchParams?.providerQuery
                              ? { providerQuery: searchParams?.providerQuery }
                              : null),
                          },
                        }}
                      />
                    </div>
                  )
                )}
              </GeneralCarousel>
            </div>
          )}
          {/* Suggested Products Carousel */}
          {!TopUpSuggestedProducts && formattedSuggestedProducts && (
            <div>
              <p className=" text-lg mt-4">
                Suggested Products for{" "}
                <span className=" font-bold">
                  {searchParams?.regionQuery || concatenatedCountryNames}
                </span>
              </p>
              {/* Slider */}
              <GeneralCarousel
                settings={SuggestedProductsCarouselSettings}
                className=" gap-x-3 mx-10 relative mt-3"
              >
                {formattedSuggestedProducts?.map(
                  (product: IProductsProps, index: number) => (
                    <div key={index} className=" flex items-center">
                      <SuggestedProductCard
                        data={product}
                        country={countries}
                        buttonText="View Offer"
                        buttonLink={{
                          pathname: `/esimInfo/${product?.productDetails?.product_Title}`,
                          query: {
                            id: `${product?.productId}`,
                            ...(searchParams?.regionQuery
                              ? { regionQuery: searchParams?.regionQuery }
                              : null),
                            ...(searchParams?.countryQuery
                              ? { countryQuery: searchParams?.countryQuery }
                              : null),
                          },
                        }}
                      />
                    </div>
                  )
                )}
              </GeneralCarousel>
            </div>
          )}
        </div>
      </div>

      {/* Works in countries */}
      <p className="mt-7">Works in</p>
      <div className="p-2 bg-white my-4 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {countryFlagsAndNames?.map((item: any) => (
          <div key={item.code} className="flex gap-x-1 mb-1 items-center">
            <Image
              src={item.flag}
              alt={item.name}
              width={20}
              height={10}
              className="w-4 h-3 rounded-[2px]"
            />
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
