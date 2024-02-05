import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export function CustomDropDown({
  onSelect,
  className,
  data,
  placeholder,
}: {
  onSelect: (value: string) => void;
  className?: string;
  // data: {logo : string; label : string; value: string}[];
  data: any;
  placeholder: string;
  provider?: string;
  country?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState("");
  // console.log("🚀 ~ file: CustomDropDown.tsx:34 ~ selected:", selected)
  let paramsProvider = pathname.split("/")[2];
  // console.log("🚀 ~ file: CustomDropDown.tsx:36 ~ paramsProvider:", paramsProvider)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Check if paramsProvider matches any of the specified values
  // const validProviders = ["All", "Sparks", "3", "Ubigi", "eSIMGo", "Airalo"];
  const validProviders = data?.map((item: any) => item.label);
  if (!validProviders?.includes(paramsProvider)) {
    paramsProvider = ""; // Set to an empty string if not in the valid list
  }

  const selectedProvider = data.find(
    (item: any) => item.label === paramsProvider
  );

  return (
    <Select
      onValueChange={(value) => {
        onSelect(value);
        setSelected(value);
      }}
    >
      <SelectTrigger
        className={cn(
          "w-[180px] focus:ring-0 focus:ring-offset-0 bg-transparent border-2 ",
          className
        )}
      >
        {/* Use paramsProvider as the initial value if available, otherwise use an empty string */}
        {selectedProvider && selectedProvider.logo ? (
          <div className="flex items-center justify-center space-x-2 space-y-2">
            <Image
              src={selectedProvider.logo}
              alt={selectedProvider.label}
              height={20}
              width={20}
            />
            <p className=" font-bold">{selectedProvider.label}</p>
          </div>
        ) : (
          <SelectValue
            placeholder={paramsProvider || placeholder}
            className="flex items-start justify-center"
          />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item: any) => (
            <SelectItem key={item.value} value={item.value} className=" my-2">
              <div className=" flex items-center justify-center space-x-2 space-y-2">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.label}
                    height={20}
                    width={20}
                  />
                )}
                <p>{item.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
