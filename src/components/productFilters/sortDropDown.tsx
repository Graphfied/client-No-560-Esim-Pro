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

export function SortDropDown({
  onSelect,
  className,
  data,
  placeholder,
}: {
  onSelect: (value: string) => void;
  className?: string;
  data: { value: string; label: string }[];
  placeholder: string;
}) {
  // const [val, selectedVal] = React.useState("");
  return (
    <Select
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <SelectTrigger
        className={cn(
          "min-[370px]:w-[180px] focus:ring-0 focus:ring-offset-0 bg-transparent border-2 ",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
