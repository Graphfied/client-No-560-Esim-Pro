import { getProductDetails } from "@/actions/getProductDetails";

interface getFormattedProductsArrayProps {
  products?: any;
  product_category?: string;
}

export const getFormattedProductsArray = (
  options: getFormattedProductsArrayProps = {}
) => {
  const { products, product_category } = options;

  const fetchProductDetails = products?.map(
    (product: any) => product.productDetails
  );

  // get Dynamic Products Details
  const product_details: any = getProductDetails(fetchProductDetails);

  const data2 = products && product_details;

  // Merge productDetails into each element of getSpecificCountryProduct
  const mergedData: any = data2
    ? products.map((product: any, index: any) => ({
        ...product,
        productDetails: product_details[index],
        product_tags: product_details[index].product_tags,
        product_details: product_details[index].product_detail,
      }))
    : [];

  if (product_category === "esim_realtime") {
    const esim_realtimeProducts = mergedData.filter(
      (item: any) => item.productCategory === `${product_category}`
    );
    return esim_realtimeProducts;
  } else if (product_category === "esim_addon") {
    const esim_addonProducts = mergedData.filter(
      (item: any) => item.productCategory === `${product_category}`
    );
    return esim_addonProducts;
  } else {
    return mergedData;
  }
};
