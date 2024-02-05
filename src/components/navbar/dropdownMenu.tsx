import Link from "next/link";
import Image from "next/image";
import { dropdownMenuData } from ".";

export default function DropdownMenu() {
  return (
    <div className="h-80 px-24 cursor-default shadow-xl bg-white">
      <div className="grid grid-cols-2 grid-rows-3 grid-flow-row pt-5 gap-4 place-items-start">
        {dropdownMenuData.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-start gap-x-4 p-3 w-[36rem] rounded-lg hover:bg-slate-50 duration-200 ease-in-out transition-colors"
          >
            <Image
              src={item.icon}
              alt="icon"
              width={35}
              height={35}
              className="rounded-lg"
            />
            <div className="space-y-1">
              <h2 className="text-[17px]">{item.label}</h2>
              <h4 className="text-slate-400">{item.description}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
