import { NavigationButtons } from "@/components/TelecomBrands/NavigationButtons";
import { HeroSection } from "@/views/homepage/HeroSection";
import { PromotionCards } from "@/views/homepage/PromotionCards";
import EsimOffers from "@/views/homepage/esimOffers";
import HowItWorks from "@/views/homepage/howItWorks";
import { PopularCountries } from "@/views/homepage/popularCountries";
import topupIcon from "/public/navbar/topupColored.svg";
import getCurrentUser from "@/actions/getCurrentUser";
import { GetSiteTitle } from "@/actions/getTitleKeys";

export default async function Home() {
  const currentUser = await getCurrentUser();
  // console.log("CurrentUser ---> ", currentUser);
  return (
    <>
      <HeroSection />
      <PopularCountries />
      <NavigationButtons
        maxWidth={"1200px"}
        className="text-lg"
        leftBtnText="Top up"
        leftBtnHref="/topup"
        leftBtnIcon={topupIcon}
      />
      <EsimOffers />
      <PromotionCards />
      <HowItWorks />
    </>
  );
}
