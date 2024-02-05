"use client";
import Link from "next/link";
import Image from "next/image";

interface CountryItemProps {
  label: string;
  icon: string;
  href?: string;
}

export const CountryItem = ({ label, icon: Icon, href }: CountryItemProps) => {
  return (
    <>
      <Link
        href={href as string}
        className="flex flex-col items-center my-2 group"
      >
        <div className="rounded-full bg-[#FFFFFF] shadow-md p-2 flex flex-col items-center justify-center w-[60px] h-[60px]">
          <Image
            src={Icon}
            alt={label}
            className="group-hover:scale-125 transition-all duration-500 ease-in-out"
            height={28}
            width={28}
          />
        </div>
        <div className="mt-1 font-semibold text-sm">
          <p>{label}</p>
        </div>
      </Link>
    </>
  );
};
