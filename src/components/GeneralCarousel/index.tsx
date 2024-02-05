"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { countriesCarouselSettings } from "@/utils/generalSettings";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GeneralCarouselProps {
  children: React.ReactNode;
  settings: any;
  className?: string;
  dots?: any;
  prevArrow?: React.ReactNode; // Define prevArrow prop
  nextArrow?: React.ReactNode; // Define nextArrow prop
}

export const GeneralCarousel = ({
  children,
  settings,
  className,
}: GeneralCarouselProps) => {
  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className=" -left-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer absolute top-[36%] z-10"
      onClick={onClick}
    >
      <div className="border-2 rounded-full border-neutral-50 p-3 bg-[#38BDEF] hover:border-[#38BDEF] duration-300">
        <IoIosArrowBack className="text-sm font-semibold text-neutral-50" />
      </div>
    </div>
  );

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className=" -right-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer absolute top-[38%] z-10"
      onClick={onClick}
    >
      <div className="border-2 rounded-full border-neutral-50 p-3 bg-[#38BDEF] hover:border-[#38BDEF] duration-300">
        <IoIosArrowForward className="text-sm font-semibold text-neutral-50 " />
      </div>
    </div>
  );
  const settinges = {
    ...(settings && settings ? settings : countriesCarouselSettings),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <Slider {...settinges} className={cn("", className)}>
      {children}
    </Slider>
  );
};
