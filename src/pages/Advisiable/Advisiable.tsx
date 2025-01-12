import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Subscribe from "../../components/Subscribe/Subscribe";
import { CardProps } from "../../types/Types";
import ProductCard from "../../components/ProductCard/ProductCard";

const cardsList = [
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
    stock: "full-stock",
    title: "Perfumes",
    discount: "50%",
    price: "$50.00",
    originalPrice: "$100",
    styles: "2 Styles available",
  },
];

export default function Advisiable() {
  const [cards, setCards] = useState<CardProps[]>(cardsList);
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-6 py-16  md:py-20 dark:text-white w-full">
        <Breadcrumbs />
        <div className="flex flex-col gap-8  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card: CardProps) => (
            <ProductCard card={card} />
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
}
