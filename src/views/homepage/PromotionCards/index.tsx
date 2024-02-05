import { PromotionCard } from "@/components/promotionCard";
import ImageOne from "../../../../public/homepage/Cards/card-one.png";
import ImageTwo from "../../../../public/homepage/Cards/card-two.png";
import ImageThree from "../../../../public/homepage/Cards/card-three.png";
import ImageFour from "../../../../public/homepage/Cards/card-four.png";

export const PromotionCards = () => {
  const images = [
    {
      imageUrl: ImageOne,
      label: "Instant delivery & ready to use",
    },
    {
      imageUrl: ImageTwo,
      label: "Best value for money",
    },
    {
      imageUrl: ImageThree,
      label: "Global coverage",
    },
    {
      imageUrl: ImageFour,
      label: "Wide selection",
    },
  ];

  return (
    <div className=" flex flex-col items-center justify-center my-14">
      <div className=" flex flex-row items-center justify-center p-1">
        <h3 className=" text-[#1A202C] text-lg font-medium">
          Why MobiMatter eSIM Marketplace?
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 mx-5 sm:gap-8 md:flex lg:flex-row items-center justify-center lg:gap-10 lg:mx-5 xl:mx-0 xl:gap-12 xl:max-w-[1200px] 2xl:gap-10 mt-5">
        {images.map((item, index) => (
          <PromotionCard
            key={index}
            imageUrl={item.imageUrl}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
