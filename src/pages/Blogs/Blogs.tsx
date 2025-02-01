import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

const cardsList: CardProps[] = [
  {
    image:
      "https://framerusercontent.com/images/zEveiEdh19MdhDXQ8gOEQ6CxIUE.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
  {
    image:
      "https://framerusercontent.com/images/HQdIDYoYM21xeqcOGv5WrJI1uuI.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
  {
    image: "https://framerusercontent.com/images/vpIHpMWu1rO72qvb46izfME.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
  {
    image:
      "https://framerusercontent.com/images/saI5BVzJIAtMyx3SX4YHOY23b4.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
  {
    image:
      "	https://framerusercontent.com/images/OhTngNiefdcam5xaMzvLNYoFLos.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
  {
    image: "	https://framerusercontent.com/images/G8wGunfEi2Ct80P62JTfPFJuQ.png",
    title: "The Evolution of Sustainable Fashion: Trends and Innovations",
    date: "Feb 28, 2022",
    description:
      "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. ",
  },
];

export default function Blogs() {
  const navigate = useNavigate();
  const [cards] = useState<CardProps[]>(cardsList);
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      
      <div className="px-6 py-16 lg:px-36 md:py-20 dark:text-white w-full">
        <Breadcrumbs />
        <div className="flex flex-col gap-8  sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 cursor-pointer "
              onClick={() => navigate("/blog", { state: { card } })}
            >
              <div className="w-full h-60">
                <img src={card.image} className="w-full h-full object-cover" />
              </div>
              <div className="font-bold">{card.title}</div>
              <div className="text-gray-500 text-xs dark:text-white/50">
                {card.date}
              </div>
              <div className="text-gray-700 w-full text-sm text-justify dark:text-white/50">
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
}
