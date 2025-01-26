import { TProduct } from "../../types/Types";

export default function ProductCard({ card }: { card: TProduct }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer" key={card.id}>
      <div className="relative">
        <img
          src={card.category.image}
          alt={card.name}
          className="w-full h-64 object-cover"
        />
        <div className="uppercase bg-[#E4E3E0] dark:bg-black/70 dark:text-white/70 rounded-sm text-sm absolute top-5 right-4 px-2 py-1">
          {card.in_stock ? "In Stock" : "Out of Stock"}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-bold">{card.name}</div>
        <div className="bg-white dark:bg-[#1A1A1A] px-1 rounded-sm">
          {Math.round(
            (1 - parseInt(card.selling_price) / parseInt(card.original_price)) *
              100
          )}
          %
        </div>
      </div>
      <div className="flex justify-between items-center text-lg">
        <div className="font-medium dark:text-white/80">
          {card.selling_price}
        </div>
        <div className="font-extralight line-through dark:text-white/40">
          {card.original_price}
        </div>
      </div>
    </div>
  );
}
