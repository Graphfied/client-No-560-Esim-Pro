import { getCountriesData } from "@/utils/getCountriesdata";
import Image from "next/image";
import Link from "next/link";

export default async function Destinations() {
  const countries = await getCountriesData();
  return (
    <div className="max-w-[1400px] px-5 md:px-8 mx-auto">
      <h1 className="font-semibold text-4xl my-10">All Destinations</h1>
      <div className="p-2 my-4 rounded-md grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries.map((item: any, index: number) => (
          <Link
            href={`/esim/${item.name}`}
            key={index}
            className="flex gap-x-2 mb-1 items-center bg-white rounded-md border-2 border-transparent hover:border-[#38BDEF] transition-all ease-in-out duration-300 p-2"
          >
            <Image
              src={item.flag}
              alt={item.name}
              width={20}
              height={20}
              className="w-6 h-5 rounded-[2px]"
            />
            <p className="">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
