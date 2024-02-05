import Image from "next/image";
import React from "react";
import IOSplay from "../../../public/topup/ISO-play.svg";
import GOOGLEPLAY from "../../../public/topup/google-play.svg";
import Iphone from "../../../public/topup/ios-image.png";

export const BannerCard = () => {
  return (
    <div className="max-w-[1140px] mx-auto mt-6 shrink-0  bg-[#00aeef] p-4 rounded-lg shadow-md flex items-center justify-between text-white h-[170px] my-6">
      <div className=" flex flex-col justify-between">
        <div className=" mb-3">
          <h3 className=" text-xl md:text-2xl lg:text-3xl font-medium">
            Supercharge your eSIM experience.
          </h3>
        </div>

        <div className=" text-sm mb-2">
          <p>Download our app</p>
        </div>

        <div className=" flex space-x-3 sm:space-x-0 items-center">
          <Image
            src={IOSplay}
            alt={"IOS_PLAY"}
            className=" h-10 w-[75px]  sm:h-auto sm:w-auto"
          />
          <Image
            src={GOOGLEPLAY}
            alt="GOOGLE_PLAY"
            className=" h-10  w-[75px] sm:h-auto sm:w-auto"
          />
        </div>
      </div>

      {/* Phone Image */}
      <div className="block">
        <Image
          src={Iphone}
          alt="iphone"
          width={218}
          height={317}
          className=""
        />
      </div>
    </div>
  );
};
