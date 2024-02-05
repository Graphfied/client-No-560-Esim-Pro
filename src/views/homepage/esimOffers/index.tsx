import EsimCard from "@/components/esimCard";
import { getDynamicProducts } from "@/actions/getDynamicProducts";
import { getCountriesData } from "@/utils/getCountriesdata";
import { getFormattedProductsArray } from "@/utils/FormattedProductsArray";
import { IProductsProps } from "@/app/(main)/esim/[search]/page";

export default async function EsimOffers() {
  const countries = await getCountriesData();

  const data = await getDynamicProducts({
    region: "Asia",
    category: "esim_realtime",
  });
  const formattedData = getFormattedProductsArray({
    products: data,
  });

  const firstNineProducts = formattedData.slice(0, 9);
  return (
    <div className="max-w-[1200px] px-5 mt-10 mx-auto">
      <h2 className="text-[#1A202C] text-lg font-medium">
        Popular eSIM offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center mt-4">
        {firstNineProducts.map((item: IProductsProps, index: number) => (
          <EsimCard
            key={index}
            data={item}
            country={countries}
            buttonText="View Offer"
            buttonLink={{
              pathname: `/esimInfo/${item?.productDetails?.product_Title}`,
              query: {
                id: `${item?.productId}`,
                regionQuery: `${item?.regions}`,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
