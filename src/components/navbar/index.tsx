import LargescreenNavbar from "./largescreenNavbar";
import MobileNavbar from "./mobileNavbar";
import uae from "/public/navbar/uae.svg";
import search from "/public/navbar/search.svg";
import send from "/public/navbar/send.svg";
import usa from "/public/navbar/usa.svg";
import europe from "/public/navbar/europe.svg";
import getCurrentUser from "@/actions/getCurrentUser";

export const navbarData = [
  {
    text: "New eSIM",
    href: "/",
  },
  {
    text: "Topup",
    href: "/topup",
  },
  {
    text: "Check Usage",
    href: "/usage",
  },
  {
    text: "FAQs",
    href: "/faq",
  },
];

export const dropdownMenuData = [
  {
    icon: search,
    label: "Search for a new eSIM",
    description: "Search for best mobile offers at home and when you travel",
    href: "/",
  },
  {
    icon: usa,
    label: "eSIM offers for USA",
    description: "Enjoy the United States with 4G speeds from $1.2/GB",
    href: "/esim/America",
  },
  {
    icon: uae,
    label: "eSIM offers for UAE",
    description:
      "Best eSIM deals for the United Arab Emirates from the top providers worldwide",
    href: "/esim/United Arab Emirates",
  },
  {
    icon: europe,
    label: "eSIM offers for Europe",
    description: "Enjoy the United States with 4G speeds from $1.2/GB",
    href: "/esim/Europe",
  },
  {
    icon: send,
    label: "See all destinations",
    description: "",
    href: "/destinations",
  },
];

export interface User {
  userid: string;
  name: string;
  email: string;
  image: string;
  rewardbalance: number;
  referencecode: string;
  firstpurchase: boolean;
}

export interface MobiUser {
  userid: number;
  name: string;
  email: string;
  image: string;
  rewardbalance: number;
  referencecode: string;
  firstpurchase: boolean;
}

export default async function Navbar() {
  const currentUser: any = await getCurrentUser();

  return (
    <div className="fixed bg-white w-full z-[80]">
      {/* Navbar for Large Screens */}
      <div className="hidden lg:block">
        <LargescreenNavbar />
      </div>
      {/* Navbar for Small Screens */}
      <div className="block lg:hidden">
        <MobileNavbar currentUser={currentUser} />
      </div>
    </div>
  );
}
