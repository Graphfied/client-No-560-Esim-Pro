"use client";

import React from "react";
import USA from "/public/homepage/popularCountries/USA.svg";
import Europe from "/public/homepage/popularCountries/europe.svg";
import Uk from "/public/homepage/popularCountries/uk-flag.svg";
import MiddleEast from "/public/homepage/popularCountries/middleEast.svg";
import Japan from "/public/homepage/popularCountries/japan.svg";
import UAE from "/public/homepage/popularCountries/uae.svg";
import Saudia from "/public/homepage/popularCountries/saudiaArabia.svg";
import Asia from "/public/homepage/popularCountries/Asia.svg";
import Americas from "/public/homepage/popularCountries/Americas.svg";
import Oceania from "/public/homepage/popularCountries/Oceania.svg";
import Africa from "/public/homepage/popularCountries/Africa.svg";
import { CountryItem } from "@/components/CountryItem";
import { countriesCarouselSettings } from "@/utils/generalSettings";
import { GeneralCarousel } from "@/components/GeneralCarousel";

export const PopularCountries = () => {
  const routes = [
    {
      label: "USA",
      icon: USA,
      href: `/esim/United States`,
    },
    {
      label: "Europe",
      icon: Europe,
      href: `/esim/Europe`,
    },
    {
      label: "UK",
      icon: Uk,
      href: `/esim/United Kingdom`,
    },
    {
      label: "Middle East",
      icon: MiddleEast,
      href: `/esim/Middle East`,
    },
    {
      label: "Japan",
      icon: Japan,
      href: `/esim/Japan`,
    },
    {
      label: "UAE",
      icon: UAE,
      href: `/esim/United Arab Emirates`,
    },
    {
      label: "KSA",
      icon: Saudia,
      href: `/esim/Saudi Arabia`,
    },
    {
      label: "Asia",
      icon: Asia,
      href: `/esim/Asia`,
    },
    {
      label: "Americas",
      icon: Americas,
      href: `/esim/Americas`,
    },
    {
      label: "Oceania",
      icon: Oceania,
      href: `/esim/Oceania`,
    },
    {
      label: "Africa",
      icon: Africa,
      href: `/esim/Africa`,
    },
  ];

  const settings = {
    ...countriesCarouselSettings,
  };

  return (
    <div className="max-w-[1200px] px-5 mt-10 mx-auto">
      <h2 className="text-[#1A202C] text-lg font-medium">
        Popular eSIM destinations
      </h2>
      <GeneralCarousel
        settings={settings}
        className="mt-5 mb-12 -mx-5 xl:max-w-[1200px]"
      >
        {routes.map((route) => (
          <CountryItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
          />
        ))}
      </GeneralCarousel>
    </div>
  );
};
