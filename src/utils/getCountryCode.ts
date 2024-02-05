import { getCountriesData } from "./getCountriesdata";

export interface getSpecificCountryCodeProps {
  name: string;
  cca2: string;
  flag: string;
}

export const getSpecificCountryCode = async (countryName: string) => {
  try {
    const countryData = await getCountriesData();

    const getCountryCode: getSpecificCountryCodeProps = countryData?.find(
      (country: any) => country.name === countryName
    );
    return getCountryCode;
  } catch (error) {
    console.error("Error fetching country code:", error);
    // throw new Error("Error fetching country code") // You can handle the error as needed
  }
};
