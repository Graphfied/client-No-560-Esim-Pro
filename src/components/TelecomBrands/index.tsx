"use client";
import Sparks from "../../../public/topup/sparks.svg";
import Three from "../../../public/topup/3.svg";
import Ubigi from "../../../public/topup/ubigi.svg";
import esimgo from "../../../public/topup/esimGo.svg";
import airalo from "../../../public/topup/airalo.svg";
import { CountryItem } from "../CountryItem";
import { ProviderCarouselSettings } from "@/utils/generalSettings";
import { GeneralCarousel } from "../GeneralCarousel";
import styles from "./provider.module.css";

const brands = [
  {
    label: "Sparks",
    icon: Sparks,
    href: `/topup/${"Sparks"}/all`,
  },
  {
    label: "3",
    icon: Three,
    href: `/topup/${"3"}/all`,
  },
  {
    label: "Ubigi",
    icon: Ubigi,
    href: `/topup/${"Ubigi"}/all`,
  },
  {
    label: "eSIMGo",
    icon: esimgo,
    href: `/topup/${"Sparks"}/all`,
  },
  {
    label: "Airalo",
    icon: airalo,
    href: `/topup/${"Sparks"}/all`,
  },
];
interface TelecomBrandsProps {
  providers: { logo: string; label: string; value: string }[];
}
export const TelecomBrands = ({ providers }: TelecomBrandsProps) => {
  const settings = {
    ...ProviderCarouselSettings,
  };

  const customDots = (dots: React.ReactNode) => (
    <ul className={`${styles.slickDots} `}>{dots}</ul>
  );
  return (
    <div className=" max-w-[1140px] px-5 mx-auto mt-6">
      {/* Heading */}
      <div className=" text-xl font-medium">
        <h3>View top-up offers by telecom operator</h3>
      </div>

      <GeneralCarousel
        settings={settings}
        dots={customDots}
        className="mt-5 mb-12 -mx-5 md:-mx-7 "
      >
        {providers?.map((brand) => (
          <CountryItem
            key={brand.label}
            label={brand.label}
            icon={brand.logo}
            href={`/topup/${brand.value}/all`}
          />
        ))}
      </GeneralCarousel>
      <div className=" flex items-center  space-x-28 w-full mx-auto my-6 "></div>
    </div>
  );
};
