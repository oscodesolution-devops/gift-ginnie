import { CardProps } from "../../types/Types";

export default function ProductCard({card}:{card:CardProps}) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer" key={card.title}>
      <div className="relative">
        <img src={card.image} alt={card.title} />
        <div className="uppercase bg-[#E4E3E0] dark:bg-black/70 dark:text-white/70 rounded-sm text-sm absolute top-5 right-4 px-2 py-1">
          {card.stock}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-bold">{card.title}</div>
        <div className="bg-white dark:bg-[#1A1A1A] px-1 rounded-sm">
          {card.discount}
        </div>
      </div>
      <div className="flex justify-between items-center text-lg">
        <div className="font-medium dark:text-white/80">{card.price}</div>
        <div className="font-extralight dark:text-white/40">
          {card.originalPrice}
        </div>
      </div>
      <div className="text-sm dark:text-white/70">{card.styles}</div>
    </div>
  );
}
