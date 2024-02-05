import buttonIconOne from "/public/topup/button-icon1.svg";
import Image from "next/image";
import surfer from "/public/surfer.png";
import { getCountriesData } from "@/utils/getCountriesdata";
import { TopupSelect } from "@/components/TopupSelect";
import { TelecomBrands } from "@/components/TelecomBrands";
import { ToggleButton } from "@/components/ToggleButton";
import { NavigationButtons } from "@/components/TelecomBrands/NavigationButtons";
import { BannerCard } from "@/components/TelecomBrands/BannerCard";
import { getProviderDetails } from "@/actions/getProviderDetails";

const TopupPage = async () => {
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
    <div>
      {/* Top Select Section */}

      <div className="relative w-full h-56">
        <Image src={surfer} alt={"hero_image"} fill className="object-cover" />
        <div className=" absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]">
          <h2 className=" absolute flex justify-start w-auto -top-9 -left-5 sm:-top-9 sm:-left-6 md:-top-10 md:-left-9 lg:-top-10 lg:left-0 xl:-top-12 xl:left-6 2xl:-top-12 2xl:left-6 3xl:-top-12 3xl:left-10   text-white text-sm  sm:text-lg md:text-xl font-semibold mb-3  text-center ">
            Shop for eSIM topups
          </h2>
          <ToggleButton />

          <TopupSelect
            optionData={optionsData}
            providers={uniqueProvidersWithLogos}
          />
        </div>
      </div>

      {/* Telecom Operator */}
      <TelecomBrands providers={uniqueProvidersWithLogos} />
      {/* General Carousel */}

      {/* Button For navigation */}
      <NavigationButtons
        leftBtnText={"Buy new eSIMs"}
        leftBtnHref={"/"}
        leftBtnIcon={buttonIconOne}
      />

      {/* Promotion image */}
      <div className=" mx-4 sm:mx-5 md:mx-7 lg:mx-7 xl:mx-auto">
        <BannerCard />
      </div>
    </div>
  );
};

export default TopupPage;
