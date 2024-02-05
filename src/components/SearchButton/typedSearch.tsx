"use client";

import * as React from "react";
import Image from "next/image";
import { Check, SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";

export function TypedSearch({
  countries,
  className,
}: {
  countries: any;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  function capitalizeEachWord(str: string) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "rounded-full p-6 gap-x-3 sm:gap-0 sm:py-7 sm:px-5 flex items-center justify-between text-[15px] font-medium focus:ring-0 focus:ring-offset-0  transition-colors duration-500 bg-transparent border-Dark-opacity-20 bg-[#FFFFFF]  border border-neutral-200 w-auto sm:max-w-[470px] md:w-[350px] lg:w-[350px] xl:w-[460px] shadow-inner mt-4 mb-6 sm:mt-6 sm:mb-6 md:mt-6 md:mb-9 lg:mt-10 lg:mb-4 xl:mt-16 xl:mb-5 group",
            className
          )}
        >
          {value
            ? countries.find((country: any) => country.name === value).name
            : "Search for a destination!"}
          <div className=" bg-[#38BDEF] rounded-full text-white  group-hover:bg-[#38BDEF] group-hover:opacity-70 transition duration-500 ease-in-out p-2 sm:p-2 md:p-2 lg:p-2  xl:p-2.5 ml-auto">
            <SearchIcon className="h-5 w-5" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        avoidCollisions={false}
        className="sm:max-w-[470px] md:w-[350px] lg:w-[350px] xl:w-[460px] h-80"
      >
        <Command>
          <CommandInput placeholder="Search country ..." />
          <CommandEmpty>No country found</CommandEmpty>
          <CommandGroup className="overflow-y-scroll">
            {countries?.map((country: any) => (
              <CommandItem
                key={country.name}
                value={country.name}
                onSelect={(currentValue) => {
                  const newValue = capitalizeEachWord(currentValue);
                  setValue(newValue);
                  setOpen(false);
                  router.push(`/esim/${newValue}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.name ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    height={20}
                    width={20}
                  />
                  {country.name}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
