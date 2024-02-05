import Image from "next/image";
import surfer from "/public/surfer.png";
import { getCountriesData } from "@/utils/getCountriesdata";
import ProductFilters from "@/components/productFilters";
import { productDetails } from "@/actions/getProductDetails";
import { getDynamicProducts } from "@/actions/getDynamicProducts";
import { getSpecificCountryCode } from "@/utils/getCountryCode";
import { TopupSearchSelect } from "@/components/topupSearchComponents/topupSearchSelect";
import { getProviderDetails } from "@/actions/getProviderDetails";
import { getFormattedProductsArray } from "@/utils/FormattedProductsArray";
import { getAdminKeys } from "@/actions/getAdminKeys";

export interface IProductsProps {
  merchantId: string;
  uniqueId: string;
  productId: string;
  rank: number;
  productCategoryId: number;
  productFamilyId: number;
  productCategory: string;
  providerId: number;
  providerName: string;
  providerLogo: string;
  retailPrice: number;
  wholesalePrice: number;
  currencyCode: string;
  created: string;
  updated: string;
  network: string;
  regions: string[];
  countries: string[];
  productDetails: productDetails;
  product_tags: [];
  product_details: [];
}

export default async function Search({
  params,
  searchParams,
}: {
  params: { topupSearch: string; provider: string };
  searchParams: { selectedCountry: string[] };
}) {
  const data1: any = await getCountriesData();

  const country = params.topupSearch.replace(/%20/g, " ");
  const paramCountry: string[] = [];
  paramCountry.push(country);

  // Check if the country is actually a region
  const isRegion = checkIfRegion(country, data1);
  const region = isRegion ? country : getRegionName(country, data1);

  const getCountryCode = await getSpecificCountryCode(country);

  const adminKeys: any = await getAdminKeys();

  let getSpecificCountryProduct;
  if (!getCountryCode) {
    getSpecificCountryProduct = await getDynamicProducts({
      region: country,
    });
  } else {
    getSpecificCountryProduct = await getDynamicProducts({
      country: getCountryCode?.cca2,
      category: "esim_addon",
      provider: params.provider,
    });
  }

  if (params.provider === "ALL") {
    // Fetch Products based on the country Code
    getSpecificCountryProduct = await getDynamicProducts({
      country: getCountryCode?.cca2,
      category: "esim_addon",
    });
  }

  const esim_realtimeProducts = getFormattedProductsArray({
    products: getSpecificCountryProduct,
    product_category: "esim_addon",
  });

  const countries = await getCountriesData();
  const countriesData = countries?.map((country: any) => country);

  const allProviderDetails = await getProviderDetails();

  // Creating an object to map provider names to logos
  const providerNamesWithLogos: {
    logo: string;
    label: string;
    value: string;
  }[] = [];

  allProviderDetails.forEach((item: any) => {
    const { providerName, providerLogo } = item;

    // Ensure the providerName is not already in the object
    if (!providerNamesWithLogos[providerName]) {
      providerNamesWithLogos[providerName] = {
        logo: providerLogo,
        label: providerName,
        value: providerName,
      };
    }
  });

  // Extracting an array of objects with unique provider names and logos
  const uniqueProvidersWithLogos = Object.values(providerNamesWithLogos);

  return (
    <div>
      <div className="relative w-full h-56">
        <Image src={surfer} alt={"hero_image"} fill className="object-cover" />
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]">
          <h2 className="text-white md:text-xl font-semibold mb-8 text-center">
            Buy Prepaid eSIM Andorra from $1.4 per GB when you visit Andorra
          </h2>

          <TopupSearchSelect
            optionData={data1}
            providerName={params?.provider}
            paramCountry={params?.topupSearch}
            providers={uniqueProvidersWithLogos}
          />
        </div>
      </div>

      {/* Use a conditional rendering to render ProductFilters based on whether region is true or false */}
      {isRegion ? (
        <ProductFilters
          region={region}
          data={esim_realtimeProducts}
          countries={countriesData}
          currentPage={"Top up existing eSIMs"}
          providerName={params?.provider!}
          countryCode={searchParams.selectedCountry}
          merchantId={adminKeys[0]?.merchantid!}
        />
      ) : (
        <ProductFilters
          country={country}
          region={region}
          data={esim_realtimeProducts}
          countries={countriesData}
          currentPage={"Top up existing eSIMs"}
          providerName={params?.provider!}
          countryCode={searchParams.selectedCountry}
          merchantId={adminKeys[0]?.merchantid!}
        />
      )}
    </div>
  );
}

// Function to check if the country is actually a region
function checkIfRegion(country: string, countriesData: any[]): boolean {
  // Search in the array of all countries to determine if it's a valid country name
  const validCountry = countriesData?.find(
    (data) => data.name.toLowerCase() === country.toLowerCase()
  );

  // If it's not a valid country, it might be a region
  return !validCountry;
}

// Function to get the region name based on the country
function getRegionName(country: string, countriesData: any[]): string {
  const countryData = countriesData?.find(
    (data) => data.name.toLowerCase() === country.toLowerCase()
  );
  // console.log("countryData", countryData);
  return countryData ? countryData.region : "";
}
