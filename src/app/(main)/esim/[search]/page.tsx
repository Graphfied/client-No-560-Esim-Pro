import Image from "next/image";
import surfer from "/public/surfer.png";
import { getCountriesData } from "@/utils/getCountriesdata";
import { MultiSelect } from "@/components/multiSelectSearch";
import ProductFilters from "@/components/productFilters";
import { productDetails } from "@/actions/getProductDetails";
import { checkIfRegion, getRegionName } from "@/utils/RegionFunctionality";
import { getDynamicProducts } from "@/actions/getDynamicProducts";
import { getSpecificCountryCode } from "@/utils/getCountryCode";
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
  params: { search: any };
  searchParams: any;
}) {
  const country = params.search.replace(/%20/g, " ");

  const paramCountry: string[] = [];
  paramCountry.push(country);
  const countries = await getCountriesData();
  const countriesData = countries?.map((country: any) => country);

  // Check if the country is actually a region
  const isRegion = checkIfRegion(country, countries);
  // console.log("🚀 ~ isRegion:", isRegion)
  const region = isRegion ? country : getRegionName(country, countries);

  const getCountryCode = await getSpecificCountryCode(country);

  const adminKeys: any = await getAdminKeys();
  let getSpecificCountryProduct;

  if (!getCountryCode) {
    getSpecificCountryProduct = await getDynamicProducts({
      region: country,
      category: "esim_realtime",
      country: searchParams?.selectedCountry,
    });
  } else if (searchParams?.selectedCountry) {
    getSpecificCountryProduct = await getDynamicProducts({
      country: searchParams?.selectedCountry,
      category: "esim_realtime",
    });
  } else if (getCountryCode) {
    getSpecificCountryProduct = await getDynamicProducts({
      country: getCountryCode?.cca2,
      category: "esim_realtime",
    });
  } else {
    getSpecificCountryProduct = await getDynamicProducts({
      region: country,
      category: "esim_realtime",
    });
  }

  const esim_realtimeProducts = getFormattedProductsArray({
    products: getSpecificCountryProduct,
    product_category: "esim_realtime",
  });

  // Fetch If Region is true
  let queryLink;

  if (isRegion === true) {
    queryLink = region;
  } else {
    queryLink = searchParams?.selectedCountry;
  }

  return (
    <div>
      <div className="relative w-full h-56">
        <Image src={surfer} alt={"hero_image"} fill className="object-cover" />
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]">
          <h2 className="text-white md:text-xl font-semibold mb-8 text-center">
            Buy Prepaid eSIM Andorra from $1.4 per GB when you visit Andorra
          </h2>

          <MultiSelect
            options={countries}
            params={paramCountry}
            region={region}
            country={country}
            countryData={countries}
            baseUrl="/esim"
          />
        </div>
      </div>

      {/* Use a conditional rendering to render ProductFilters based on whether region is true or false */}
      {isRegion ? (
        <ProductFilters
          region={region}
          data={esim_realtimeProducts}
          countries={countriesData}
          currentPage={"New eSIMS"}
          queryLink={queryLink}
          merchantId={adminKeys[0]?.merchantid!}
        />
      ) : (
        <ProductFilters
          country={country}
          region={region}
          data={esim_realtimeProducts}
          countries={countriesData}
          currentPage={"New eSIMS"}
          queryLink={queryLink}
          merchantId={adminKeys[0]?.merchantid!}
        />
      )}
    </div>
  );
}
