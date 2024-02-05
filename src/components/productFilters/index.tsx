"use client";
import { ChevronRight, ListFilter } from "lucide-react";
import Link from "next/link";
import EsimCard from "@/components/esimCard";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { IProductsProps } from "@/app/(main)/esim/[search]/page";
import { dataForSearchPage } from "@/utils/customSelectorData";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filters from "./filters";
import { SortDropDown } from "./sortDropDown";

export default function ProductFilters({
  country,
  region,
  data,
  countries,
  currentPage,
  queryLink,
  providerName,
  countryCode,
  merchantId,
}: {
  country?: any;
  region?: any;
  data?: IProductsProps[];
  countries: any;
  currentPage: string;
  queryLink?: string;
  providerName?: string;
  countryCode?: string[];
  merchantId?: string;
}) {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortedData, setSortedData] = useState(data);
  const [open, setOpen] = useState(false);
  const [selectedCountryCodes, setSelectedCountryCodes] = useState<string[]>(
    []
  );

  // Filters state
  const [filters, setFilters] = useState({
    maxPrice: undefined,
    minValidity: undefined,
    minDataAllowance: undefined,
  });

  useEffect(() => {
    const countryParams = searchParams.get("selectedCountry");

    if (countryParams) {
      const codes = countryParams.split("%2C");
      setSelectedCountryCodes(codes as string[]);
    }
  }, [searchParams, setSelectedCountryCodes]);
  let regionQuery: any;
  let countryQuery: any;
  let providerQuery: any;
  if (queryLink === region) {
    regionQuery = queryLink;
  } else {
    countryQuery = queryLink;
  }

  if (providerName) {
    // regionQuery = regionQuery ? regionQuery + providerName : providerName;
    providerQuery = providerName;
  }

  if (countryCode) {
    countryQuery = countryQuery ? countryQuery + countryCode : countryCode;
  }
  // Sorting Function
  const handleSortValue = (value: string) => {
    // Apply filters first to get filtered products
    const filteredProducts = applyFilters();
    // Define a mapping of sorting criteria to corresponding functions
    const sortingCriteria: any = {
      default: (a: any, b: any) => a.rank - b.rank,
      "lowest price": (a: any, b: any) => a.retailPrice - b.retailPrice,
      "lowest price per gb": (a: any, b: any) =>
        a.retailPrice / a.productDetails.product_data_limit -
        b.retailPrice / b.productDetails.product_data_limit,
      "most data allowance": (a: any, b: any) =>
        b.productDetails.product_data_limit -
        a.productDetails.product_data_limit,
      "longest validity": (a: any, b: any) =>
        b.productDetails.product_validity - a.productDetails.product_validity,
    };
    // Specify the desired sorting criteria
    const sortingCriteriaKey: any = value;

    // Apply sorting using the selected criteria
    // @ts-ignore
    const sortedProducts = [...filteredProducts].sort(
      sortingCriteria[sortingCriteriaKey]
    );
    setSortedData(sortedProducts);
  };

  const applyFilters = useCallback(() => {
    let filteredProducts = [...data!];

    // Apply filters based on the sidebar input fields
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          !isNaN(product.retailPrice) &&
          product.retailPrice <= filters.maxPrice!
      );
    }

    if (filters.minValidity !== undefined && filters.minValidity > 0) {
      const minValidityInHours = filters.minValidity * 24;

      filteredProducts = filteredProducts.filter((product) => {
        const productValidityInHours = Number(
          product.productDetails.product_validity
        );
        return (
          !isNaN(productValidityInHours) &&
          productValidityInHours >= minValidityInHours
        );
      });
    }
    if (filters.minDataAllowance !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          !isNaN(Number(product.productDetails.product_data_limit)) &&
          Number(product.productDetails.product_data_limit) >=
            filters.minDataAllowance!
      );
    }
    setSortedData(filteredProducts);
    return filteredProducts;
  }, [data, filters.maxPrice, filters.minValidity, filters.minDataAllowance]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setShowFilters(!showFilters);
  };

  // trigger applyFilters on first button click
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Reset filters
  const handleFilterChange = (key: string, value: string) => {
    const numericValue = value.trim() === "" ? undefined : Number(value);
    setFilters((prevFilters) => ({ ...prevFilters, [key]: numericValue }));
    applyFilters();
  };

  return (
    <div className="max-w-[1350px] mx-auto px-5">
      {/* Navigation Bar */}
      <div className="flex items-center gap-x-3">
        <Link
          href="/"
          className="text-xs sm:text-sm text-gray-700 hover:underline hover:underline-offset-2"
        >
          Home
        </Link>
        <ChevronRight size={13} />
        <Link
          href={`/`}
          className="text-xs sm:text-sm text-gray-700 hover:underline hover:underline-offset-2"
        >
          {currentPage}
        </Link>

        {region && (
          <>
            <ChevronRight size={13} />
            <Link
              href={`/esim/${region}`}
              className="text-xs sm:text-sm text-gray-700 hover:underline hover:underline-offset-2"
            >
              {region}
            </Link>
          </>
        )}

        {country && (
          <>
            <ChevronRight size={13} />
            <Link
              href={`/esim/${country}`}
              className="text-xs sm:text-sm text-gray-700 hover:underline hover:underline-offset-2"
            >
              {country}
            </Link>
          </>
        )}
      </div>

      {/* Discover text */}
      {country ? (
        <h2 className="mt-3">
          Discover travel eSIM data packages that work in {country} and beyond!
        </h2>
      ) : (
        <h2 className="mt-2">
          Discover travel eSIM data packages that work in {region} and beyond!
        </h2>
      )}

      <div className="mt-2 flex flex-col md:flex-row items-start justify-between">
        {/* Total Products */}
        {data && data.length > 0 ? (
          <p className="text-txtgrey">{data.length} products</p>
        ) : (
          <p className="text-txtgrey">{data?.length} products</p>
        )}
        <div className="flex flex-row md:flex-col items-end gap-y-2 mt-2 md:mt-0 w-full md:w-auto">
          {/* Sort By */}
          <div className="flex items-center gap-x-3">
            <p className="text-txtgrey hidden md:block">Sort By</p>
            <SortDropDown
              onSelect={handleSortValue}
              data={dataForSearchPage}
              placeholder="Recommended"
            />
          </div>
          {/* Show Hide Filters Button*/}
          <div className="w-full">
            {/* Large Screens */}
            <div className="hidden md:block w-full">
              <Button
                className="w-full bg-transparent border-2 font-normal hover:bg-transparent focus:ring-0 focus:ring-offset-0"
                variant="outline"
                onClick={toggleSidebar}
              >
                <ListFilter size={15} className="mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            {/* Mobile */}
            <div className="md:hidden text-right">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="bg-transparent border-2 font-normal hover:bg-transparent focus:ring-0 focus:ring-offset-0"
                    variant="outline"
                  >
                    <ListFilter size={15} className="mr-2" />
                    Show Filters
                  </Button>
                </SheetTrigger>
                {/* Sheet for small screens*/}
                <SheetContent
                  side={"bottom"}
                  className="w-full top-0 md:hidden z-[150]"
                >
                  <SheetHeader className="my-7 ">
                    <SheetTitle className="flex items-end justify-between">
                      <p></p>
                      <p>Filter By</p>
                      <button
                        className="text-[#38BDEF] text-sm underline underline-offset-2"
                        onClick={() => {
                          setFilters({
                            maxPrice: undefined,
                            minValidity: undefined,
                            minDataAllowance: undefined,
                          });
                        }}
                      >
                        Clear
                      </button>
                    </SheetTitle>
                  </SheetHeader>
                  <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={() => {
                      setFilters({
                        maxPrice: undefined,
                        minValidity: undefined,
                        minDataAllowance: undefined,
                      });
                      applyFilters(); // Apply filters after resetting
                    }}
                  />
                  <SheetFooter className="mt-7">
                    <Button
                      className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] min-w-full"
                      onClick={() => {
                        setOpen(false);
                        applyFilters();
                        setShowFilters(false);
                      }}
                    >
                      Apply Filters
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-3 gap-x-3">
        {/* Sidebar, hidden for small screens*/}
        {showFilters && (
          <div className="hidden md:block min-w-[20%]">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={() => {
                setFilters({
                  maxPrice: undefined,
                  minValidity: undefined,
                  minDataAllowance: undefined,
                });
                applyFilters(); // Apply filters after resetting
              }}
            />
          </div>
        )}

        {/* Product Grid */}
        <div
          className={`${showFilters ? "md:w-auto" : "min-w-[90%]"} mx-auto `}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center mt-4`}
          >
            {(
              (sortedData && sortedData.length > 0 ? sortedData : data) || []
            ).map((product: IProductsProps, index: number) => (
              <EsimCard
                key={index}
                data={product}
                country={countries}
                buttonText="View Offers"
                buttonLink={{
                  pathname: `/esimInfo/${product?.productDetails?.product_Title}`,
                  query: {
                    id: `${product?.productId}`,
                    // region : regionQuery,
                    // country : countryQuery
                    ...(region ? { regionQuery } : null), // Add region query if region exists
                    ...(country ? { countryQuery } : null), // Add country query if country exists
                    ...(providerName ? { providerQuery } : null), // Add provider query if provider exists
                  },
                }}
                merchantId={merchantId}
              />
            ))}
            {!(
              (sortedData && sortedData.length > 0) ||
              (data && data.length > 0)
            ) && (
              <div className="flex flex-col items-center col-span-3">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">
                    We currently don&apos;t have any offers for this search
                    criteria..
                  </p>
                  <p>
                    Try searching for another destination or adjusting your
                    filters.
                  </p>
                </div>
                <Image
                  alt=""
                  height={150}
                  width={150}
                  src="/profile/card.svg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
