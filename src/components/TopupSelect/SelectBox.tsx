"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

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

export function SelectBox({
  countries,
  className,
  provider,
  baseUrl,
}: {
  countries: any;
  className?: string;
  provider: string;
  baseUrl?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  function capitalizeEachWord(str: string) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!provider) {
      event.preventDefault();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {provider ? (
        <PopoverTrigger
          asChild
          onKeyDown={handleKeyPress}
          onKeyUp={handleKeyPress}
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              `w-full py-2 justify-between text-gray-500 hover:bg-white shadow-md h-16 ${
                provider ? "" : " cursor-not-allowed"
              } ${provider ? " opacity-100" : " opacity-100"}`,
              className
            )}
            // disabled={!provider}
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
          >
            {value
              ? countries.find((country: any) => country.name === value)?.name
              : provider
              ? "Search for a destination!"
              : "Select a provider first!"}
          </Button>
        </PopoverTrigger>
      ) : (
        <>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              `w-full py-2 justify-between text-gray-500 hover:bg-white shadow-md h-16 ${
                provider ? "" : " cursor-not-allowed"
              } ${provider ? " opacity-100" : " opacity-100"}`,
              className
            )}
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
          >
            {value
              ? countries.find((country: any) => country.name === value)?.name
              : provider
              ? "Search for a destination!"
              : "Select a provider first!"}
          </Button>
        </>
      )}

      {provider && (
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className={cn("w-[80dvw] h-80", className)}
        >
          <Command>
            <CommandInput placeholder="Search country ..." />
            <CommandEmpty>No country found</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {countries.map((country: any) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={(currentValue) => {
                    const newValue = capitalizeEachWord(currentValue);
                    setValue(newValue);
                    setOpen(false);
                    // Check if provider is present before pushing to router
                    if (provider) {
                      const url = baseUrl
                        ? baseUrl
                        : `/topup/${provider}/${newValue}`;
                      router.push(url);
                    } else {
                      console.warn(
                        "Provider not provided. Router push skipped."
                      );
                    }
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
      )}
    </Popover>
  );
}
