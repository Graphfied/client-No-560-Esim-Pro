import Image from "next/image";
import countries from "/public/homepage/mobileCard/Countries.png";
import qr from "/public/homepage/mobileCard/QR.png";
import wifi from "/public/homepage/mobileCard/Wifi.png";
import Link from "next/link";

const mobileImages = [
  {
    image: countries,
    label: "Choose destination & package",
    description: "MobiMatter offers eSIM packages for 190+ countries",
  },
  {
    image: qr,
    label: "Install eSIM",
    description:
      "Instantly get your eSIM and configure it in your eSIM compatible device",
  },
  {
    image: wifi,
    label: "Enjoy high speed connectivity",
    description:
      "Once eSIM is configured, you can enjoy high speed roaming data connectivity",
  },
];

export default function HowItWorks() {
  return (
    <div className="max-w-[1200px] px-5 my-10 mx-auto">
      <h2 className="text-[#1A202C] text-lg font-medium text-center">
        How It Works
      </h2>
      <h2 className="text-[#1A202C] mt-3 text-center italic">
        Check{" "}
        <span className="text-[#00AEEF]">
          <Link href={"/help"}>Help & FAQs</Link>
        </span>{" "}
        to see if your device supports eSIM technology
      </h2>
      {/* Mobile Images */}
      <div className="bg-white p-10 mt-3 grid lg:grid-cols-3 place-items-center gap-y-10  lg:gap-x-2">
        {mobileImages.map((item, index) => (
          <div key={index} className="flex flex-col items-center max-w-[21rem]">
            <Image src={item.image} alt={"mobile"} className="shrink-0" />
            <h2 className="text-[#00AEEF] text-center text-[17px] font-semibold mt-3">
              {item.label}
            </h2>
            <h2 className="text-[#1A202C] text-center text-[15px] mt-1">
              {item.description}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
