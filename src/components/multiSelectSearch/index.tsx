"use client";
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Check, X, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MultiSelectProps {
  options: any[];
  params?: string[];
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  region?: any;
  country?: any;
  countryData?: any;
  baseUrl: string;
}

function MultiSelect({
  options,
  params,
  onChange = () => {},
  className,
  region,
  country,
  countryData,
  baseUrl,
  ...props
}: MultiSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(params! || []);

  // this useEffect will send the selected values to the URL
  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    const selectedCountryString = newSearchParams!.get("selectedCountry");
    const selectedCountryArrayLength = selectedCountryString?.split(",").length;

    // Find the selected country codes in countryData
    const selectedCountryCodes = countryData?.filter((country: any) =>
      selected?.includes(country.name)
    );

    // Extract the country codes from the selectedCountryCodes array
    const countryCodes = selectedCountryCodes?.map(
      (country: any) => country.cca2
    );

    // Update URL with the filtered selected values
    if (countryCodes.length > 0) {
      newSearchParams.set("selectedCountry", countryCodes?.join(","));
    } else {
      newSearchParams.delete("selectedCountry");
    }

    // const baseUrl = pathname.split("/")[1];
    // console.log(baseUrl);

    if (selectedCountryArrayLength! > 1) {
      router.replace(`${pathname}?${newSearchParams.toString()}`, undefined);
    } else {
      router.replace(
        `${baseUrl}/${selected[0] || params}?${newSearchParams.toString()}`,
        undefined
      );
    }
  }, [
    selected,
    pathname,
    searchParams,
    region,
    country,
    countryData,
    options,
    router,
    params,
    baseUrl,
  ]);

  onChange = setSelected;
  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full py-2 justify-between text-gray-500 hover:bg-white shadow-md ${
            selected?.length > 0 ? "h-full" : "h-16"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="">
            <div className="flex gap-1 flex-wrap">
              {selected?.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mr-1 mb-3"
                  onClick={() => handleUnselect(item)}
                >
                  {/* {item} */}
                  {decodeURIComponent(item)}{" "}
                  {/* Decode the country name before rendering */}
                  <div
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}
            </div>
            <p className="font-normal text-left">Select countries ...</p>
          </div>
          <div className=" bg-[#38BDEF] rounded-full text-white  hover:bg-[#38BDEF] hover:opacity-70 transition duration-500 ease-in-out p-2 sm:p-2 md:p-2 lg:p-2  xl:p-2.5 ml-auto">
            <SearchIcon className="h-5 w-5" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[80dvw]", className)}>
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.name}
                onSelect={() => {
                  onChange(
                    selected?.includes(option.name)
                      ? selected?.filter((item) => item !== option.name)
                      : [...selected, option.name]
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected?.includes(option.name)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <Image
                    src={option.flag}
                    alt={option.name}
                    height={20}
                    width={20}
                  />
                  {option.name}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
