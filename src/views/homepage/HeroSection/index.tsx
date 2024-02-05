import HeroImage from "../../../../public/homepage/heroSection/heroImage.png";
import Image from "next/image";
import { SearchButton } from "@/components/SearchButton";
import { getCountriesData } from "@/utils/getCountriesdata";

export const HeroSection = async () => {
  const data: any = await getCountriesData();

  return (
    <>
      {/* main div */}
      <div className=" bg-[#FFFFFF] w-full shadow-lg">
        <div className=" flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row lg:items-center lg:justify-center w-full h-auto ">
          {/* First Text Div */}
          <div className=" flex flex-col items-center justify-center lg:w-[830px]  xl:w-[862px] mx-auto">
            {/* heading */}
            <div className="  font-semibold w-auto px-2  text-xl sm:text-2xl md:text-3xl lg:text-2xl  xl:text-3xl  sm:max-w-[470px] md:max-w-[580px] lg:max-w-[540px] xl:w-[588px] text-center ">
              <h1>
                Unleash the power of eSims and stay connected like never before
              </h1>
            </div>
            {/* text */}
            <p className=" px-8 mt-3 sm:max-w-[400px] md:max-w-[440px] lg:max-w-[470px] xl:w-[522px] font-light text-[#000000] sm:mt-3 md:mt-3 lg:mt-4  xl:mt-5  text-center">
              lorem ipsam maki doka sum dom dim dega saki namo onga bonnga sedes
              te do sek sa
            </p>

            {/* Search Button */}
            <SearchButton data={data} />
          </div>

          {/* Image Div */}
          <div className=" h-auto">
            <Image
              src={HeroImage}
              alt="Hero_Image"
              width={900}
              height={522}
              className=" mb-4 sm:mb-5  sm:w-full sm:h-[300px] md:w-full md:h-[400px] md:mb-8 lg:mb-0 lg:w-[800px] lg:h-[350px]  xl:w-[900px] xl:h-[420px] 3xl:w-[1250px] 3xl:h-[522px] "
            />
          </div>
        </div>
      </div>
    </>
  );
};
