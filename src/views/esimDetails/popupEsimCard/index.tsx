"use client";
import React, { useState, useEffect } from "react";
import EsimCard from "@/components/esimCard";

const PopupEsimCard = ({ data, country, buttonLink, merchantId }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-[76px] z-50  w-full sm:w-[80%] md:hidden transition-all duration-500 ${
          isScrolled ? "translate-y-0" : "translate-y-full "
        }`}
      >
        <EsimCard
          data={data}
          country={country}
          buttonText="Buy Now"
          buttonLink={buttonLink}
          merchantId={merchantId}
        />
      </div>
    </>
  );
};

export default PopupEsimCard;
