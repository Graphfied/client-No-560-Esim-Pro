"use client";

import { useEffect, useState } from "react";
import { TypedSearch } from "./typedSearch";

export const SearchButton = ({ data }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <TypedSearch countries={data} />
    </>
  );
};
