import { TPopularProductItem } from "../../types/Types";

export default function HomePageCards({ card }: { card: TPopularProductItem }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer w-60" >
      <div className="relative h-96 w-full">
        <img
          src={card.image}
          alt={card.image}
          className="w-full h-full object-cover"
        />
        {/* <div className="uppercase bg-[#E4E3E0] dark:bg-black/70 dark:text-white/70 rounded-sm text-sm absolute top-5 right-4 px-2 py-1">
          {card.stock}
        </div> */}
      </div>
      {/* <div className="flex justify-between items-center">
        <div className="font-bold truncate dark:text-white pr-2">
          {card.title}
        </div>
        <div className="bg-white dark:bg-white/70 px-1 rounded-sm shrink-0">
          {card.discount}
        </div>
      </div>
      <div className="flex justify-between items-center text-lg">
        <div className="font-medium dark:text-white/80">{card.price}</div>
        <div className="font-extralight dark:text-white/40">
          {card.originalPrice}
        </div>
      </div> */}
      {/* <div className="text-sm dark:text-white/70 truncate">{card.styles}</div> */}
    </div>
  );
}
