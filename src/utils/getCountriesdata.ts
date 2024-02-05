export const getCountriesData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const countriesInfo = data.map((country: any) => ({
      name: normalizeAndRemoveDiacritics(country.name.common),
      cca2: country.cca2,
      flag: country.flags.svg,
      region: country.region,
    }));

    // Sort countries alphabetically by name
    countriesInfo.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return countriesInfo;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    // throw new Error("Error fetching countries data") // You can handle the error as needed
  }
};

const normalizeAndRemoveDiacritics = (str: string) => {
  return str.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
};
