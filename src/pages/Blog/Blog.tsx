import { LuDot } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IContent {
  title: string;
  content: string[];
  conclusion: string;
}

const content: IContent = {
  title:
    "In recent years, sustainable fashion has emerged as a powerful movement within the industry, driven by increasing awareness of environmental and social issues. From eco-friendly materials to ethical production practices, let's explore the evolution of sustainable fashion and the trends and innovations shaping its future.",
  content: [
    "Rise of Eco-Friendly Fabrics: Traditional fashion materials like cotton and polyester have significant environmental impacts, leading designers to seek alternatives. Eco-friendly fabrics such as organic cotton, hemp, bamboo, and Tencel are gaining popularity for their lower ecological footprint and biodegradability.",
    "Circular Fashion: The concept of circular fashion aims to eliminate waste and pollution by designing clothing that can be recycled, upcycled, or biodegraded at the end of its lifecycle. Brands are adopting circularity through initiatives like clothing rental, garment recycling programs, and designing for longevity.",
    "Ethical Supply Chains: Consumers are demanding transparency and accountability from fashion brands regarding their supply chains. Ethical production practices, fair wages, and safe working conditions are becoming integral to sustainable fashion, with certifications like Fair Trade and B Corp driving industry standards.",
    "Slow Fashion Movement: In contrast to fast fashion's rapid production cycles and disposable mentality, the slow fashion movement advocates for mindful consumption and investment in quality, timeless pieces. Slow fashion encourages consumers to cherish their clothing, repair and maintain them, and prioritize longevity over trend-driven purchases.",
    "Tech-Driven Innovation: Technology plays a crucial role in advancing sustainability in fashion, with innovations such as 3D printing, digital design tools, and blockchain tracing revolutionizing supply chain transparency and efficiency. Additionally, biofabrication and lab-grown materials offer promising alternatives to conventional textiles, reducing the industry's reliance on natural resources.",
    "Consumer Empowerment: As awareness of sustainability grows, consumers are driving change by making conscious purchasing decisions and supporting brands that align with their values. Social media and online platforms empower consumers to hold brands accountable, advocate for transparency, and foster a community dedicated to sustainable fashion.",
  ],
  conclusion:
    "The evolution of sustainable fashion is a journey towards a more responsible and ethical industry. By embracing innovation, collaboration, and consumer education, we can create a fashion ecosystem that respects both people and the planet.",
};

export default function Blog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { card } = location.state || {}; // Access the passed data

  useEffect(() => {
    if (!card) {
      // Navigate back to /blogs if no card data is found
      navigate("/blogs");
    }
  }, [card, navigate]);

  if (!card) {
    // If card is missing, render nothing while navigating
    return null;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-6 py-16 lg:px-36 md:py-20 dark:text-white w-full flex flex-col gap-8">
        <div className="text-4xl font-bold mx-auto leading-snug flex text-center text-[#454442]">
          {card.title}
        </div>

        <div className="text-gray-500 w-full mx-auto text-center font-semibold flex items-center justify-center">
          <LuDot className="text-2xl" /> {card.date}{" "}
          <LuDot className="text-2xl" />{" "}
        </div>
        <div>
          <img
            src={card.image}
            alt=""
          />
        </div>
        <div className="font-semibold flex flex-col gap-4 sm:mx-20 md:mx-30">
          <p>{content.title}</p>
          <ol className="flex flex-col gap-4">
            {content.content.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ol>

          <p>{content.conclusion}</p>
        </div>
      </div>
    </div>
  );
}
