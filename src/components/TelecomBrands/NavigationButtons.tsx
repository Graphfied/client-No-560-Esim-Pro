import { Button } from "../ui/button";
import buttonIconTwo from "../../../public/topup/usage.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NavigationButtons = ({
  maxWidth = "1140px",
  className,
  leftBtnText,
  leftBtnHref,
  leftBtnIcon,
}: {
  maxWidth?: string;
  className?: string;
  leftBtnText: string;
  leftBtnHref: string;
  leftBtnIcon: string;
}) => {
  return (
    <div
      className={`max-w-[${maxWidth}] mx-auto mt-6 ${
        leftBtnText === "Top up"
          ? "px-5"
          : "px-4 sm:px-5 md:px-7 lg:px-7 xl:px-0"
      } `}
    >
      {/* Heading */}
      <div className={cn("text-xl sm:text-xl font-medium", className)}>
        <h3>Jump to</h3>
      </div>

      {/* Buttons */}
      <div className=" flex items-center w-full space-x-2 sm:space-x-4 mt-4 mb-6">
        <Button
          asChild
          className="px-0 bg-white w-full h-12 sm:h-[65px] hover:bg-white"
        >
          <Link href={leftBtnHref}>
            <div className=" flex items-center gap-1">
              <Image src={leftBtnIcon} alt="Button-Icon-One" />
              <p className=" text-black ">{leftBtnText}</p>
            </div>
          </Link>
        </Button>
        <Button
          asChild
          className=" bg-white w-full h-12 sm:h-[65px] hover:bg-white"
        >
          <Link href={"/usage"}>
            <div className=" flex items-center gap-1">
              <Image src={buttonIconTwo} alt="Button-Icon-One" />
              <p className=" text-black">Check Usage</p>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
