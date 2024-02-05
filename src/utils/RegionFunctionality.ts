// Function to check if the country is actually a region
export function checkIfRegion(country: string, countriesData: any[]): boolean {
  // Search in the array of all countries to determine if it's a valid country name
  const validCountry = countriesData?.find(
    (data) => data.name.toLowerCase() === country.toLowerCase()
  );

  // If it's not a valid country, it might be a region
  return !validCountry;
}

// Function to get the region name based on the country
export function getRegionName(country: string, countriesData: any[]): string {
  const countryData = countriesData?.find(
    (data) => data.name.toLowerCase() === country.toLowerCase()
  );
  // console.log("countryData", countryData);
  return countryData ? countryData.region : "";
}
