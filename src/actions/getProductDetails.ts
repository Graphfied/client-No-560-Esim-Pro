export interface productDetails {
  product_detail: string;
  product_validity: string;
  product_data_unit: string;
  product_data_limit: string;
  product_tags: string[];
  product_Title: string;
  product_FIVEG: string;
}

export const getProductDetails = (product: any) => {
  try {
    const results: productDetails[] = [];

    product?.forEach((item: any) => {
      const result = {
        product_detail: "",
        product_validity: "",
        product_data_unit: "",
        product_data_limit: "",
        product_tags: [],
        product_Title: "",
        product_FIVEG: "",
      };

      item.forEach((item: any) => {
        switch (item.name) {
          case "PLAN_DETAILS ":
            result.product_detail = JSON.parse(item.value);
            break;
          case "PLAN_VALIDITY":
            result.product_validity = item.value;
            break;
          case "PLAN_DATA_UNIT":
            result.product_data_unit = item.value;
            break;
          case "PLAN_DATA_LIMIT":
            result.product_data_limit = item.value;
            break;
          case "TAGS":
            result.product_tags = JSON.parse(item.value);
            break;
          case "PLAN_TITLE":
            result.product_Title = item.value;
            break;
          case "FIVEG":
            result.product_FIVEG = item.value;
            break;
        }
      });

      results.push(result);
    });

    return results;
  } catch (error: any) {
    // throw new Error("Error fetching product details");
    console.log("Error fetching product details", error.message);
  }
};

// Extract all tags from the resulting productDetails array
export const getAllTags = (products: any): string[] => {
  return products.reduce(
    (tags: any, product: any) => tags.concat(product.product_tags),
    []
  );
};
