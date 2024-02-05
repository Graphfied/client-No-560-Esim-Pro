"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface props {
  text: string;
  img: string;
  path: string;
}

const OptionListComponent: React.FC<props> = ({ text, img, path }) => {
  const router = useRouter();

  const handlePush = () => {
    let p = `/profile/${path}`;
    router.push(p);
  };
  return (
    <div
      className=" flex h-[3rem] justify-between items-center px-4 py-2 w-full bg-white drop-shadow-md rounded-md cursor-pointer"
      onClick={() => handlePush()}
    >
      <div className="flex justify-start space-x-2">
        <Image alt="" height={25} width={25} src={img} />
        <p>{text}</p>
      </div>
      <ArrowRight className="text-btnblue" />
    </div>
  );
};

export default OptionListComponent;
