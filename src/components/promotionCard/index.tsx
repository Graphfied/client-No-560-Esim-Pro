import Image from "next/image";

interface PromotionCard {
  imageUrl: any;
  label: string;
}

export const PromotionCard: React.FC<PromotionCard> = ({ imageUrl, label }) => {
  return (
    <div className="rounded-lg relative overflow-hidden ">
      <div className="absolute top-3 left-2 right-2 sm:top-5 sm:right-8 sm:left-8 text-center z-50">
        <h3 className="text-white font-bold">{label}</h3>
      </div>
      <Image
        src={imageUrl}
        alt={""}
        width={255}
        height={355}
        className="shrink-0 hover:scale-110 transition duration-500 ease-in-out"
      />
    </div>
  );
};
