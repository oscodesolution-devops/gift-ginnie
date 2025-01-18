import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Hero from "../../components/Hero/Hero";
import Reviews from "../../components/Reviews/Reviews";
import Trending from "../../components/TrendingSection/Trending";
import Subscribe from "../../components/Subscribe/Subscribe";

const productDescription: { title: string; content: string }[] = [
  {
    title: "Product Description",
    content:
      "The sun dipped below the horizon, casting hues of amber and crimson across the tranquil sea. In the distance, a lone gull circled above the waves, its cries fading into the soft whisper of the evening breeze. Beneath the fading light, the world seemed to pause, as if nature herself held her breath in anticipation of the night to come.",
  },
  {
    title: "Material",
    content:
      "The sun dipped below the horizon, casting hues of amber and crimson across the tranquil sea. In the distance, a lone gull circled above the waves, its cries fading into the soft whisper of the evening breeze. Beneath the fading light, the world seemed to pause, as if nature herself held her breath in anticipation of the night to come.",
  },
  {
    title: "Delivery",
    content:
      "The sun dipped below the horizon, casting hues of amber and crimson across the tranquil sea. In the distance, a lone gull circled above the waves, its cries fading into the soft whisper of the evening breeze. Beneath the fading light, the world seemed to pause, as if nature herself held her breath in anticipation of the night to come.",
  },
];

export default function Product() {
  const [openDescription, setOpenDescription] = useState(-1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (contentRef.current && window.innerWidth >= 768) {
        // Only apply scroll behavior on desktop
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

        if (!isScrolledToBottom || e.deltaY < 0) {
          const maxScroll = scrollHeight - clientHeight;
          const newScrollTop = Math.min(
            maxScroll,
            Math.max(0, scrollTop + e.deltaY)
          );

          if (newScrollTop !== scrollTop) {
            e.preventDefault();
            contentRef.current.scrollTop = newScrollTop;
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="w-full min-h-screen sm:mt-20">
      <div className="w-full pt-5 md:grid md:grid-cols-2 gap-8 px-6 md:px-7">
        {/* Image container - Responsive adjustments */}
        <div className="w-full md:sticky md:top-20 h-auto md:h-[calc(100vh-2rem)] mb-6 md:mb-0">
          <img
            className="w-full h-[300px] md:h-[90%] object-cover"
            src="https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024"
            alt=""
          />
        </div>

        {/* Content container - Responsive adjustments */}
        <div
          ref={contentRef}
          className="dark:text-primary md:h-[calc(100vh-2rem)] md:overflow-y-auto custom-scrollbar"
        >
          <div className="flex flex-col gap-4 border-b dark:border-white/30 pb-6">
            <div>Jeans</div>
            <div className="font-bold text-3xl md:text-5xl">Perfumes</div>
            <div className="flex gap-2 flex-wrap">
              <CategoryStyle category="full-stock" />
              <CategoryStyle category="Men" />
            </div>
          </div>

          <div className="flex justify-between items-center py-6 border-b dark:border-white/30">
            <div className="text-lg md:text-xl font-thin">$50.00</div>
            <div className="flex gap-4 text-sm">
              <div className="line-through">$100</div>
              <div className="bg-black/10 px-1 dark:bg-white/10">50%</div>
            </div>
          </div>

          <div className="py-6 border-b dark:border-white/30 flex flex-col gap-4">
            <div>Choose Other Versions</div>
            <div className="flex gap-2 flex-wrap">
              <OtherVersionImages imageUrl="https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024" />
              <OtherVersionImages imageUrl="https://framerusercontent.com/images/mxOD2EdPpQTvsdb7pn12OcLFBk.png?scale-down-to=512" />
              <OtherVersionImages imageUrl="https://framerusercontent.com/images/awfeManzhDFj7yyIY09lfzkGQQ.jpg?scale-down-to=1024" />
            </div>
          </div>

          <div className="py-6 border-b dark:border-white/30 flex flex-col gap-4">
            <div>Choose the size</div>
            <div className="flex gap-2 flex-wrap">
              <DifferentSizes size="S" />
              <DifferentSizes size="M" />
              <DifferentSizes size="L" />
              <DifferentSizes size="XL" />
            </div>
          </div>

          <div className="py-6 flex flex-col gap-4">
            {productDescription.map((description, index) => (
              <div key={description.title}>
                <div
                  onClick={() =>
                    setOpenDescription(openDescription === index ? -1 : index)
                  }
                  className="flex justify-between items-center cursor-pointer w-full"
                >
                  <span className="font-bold">{description.title}</span>
                  <span>
                    {openDescription === index ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </span>
                </div>
                {openDescription === index && (
                  <p className="py-5 text-sm">{description.content}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <button className="bg-black dark:bg-primary text-white font-bold dark:text-black uppercase py-3 w-full">
              purchase now
            </button>
          </div>
        </div>
      </div>
      <Hero />
      <Reviews />
      <Trending/>
      <Subscribe/>
    </div>
  );
}

function CategoryStyle({ category }: { category: string }) {
  return (
    <div className="border-1 uppercase text-xs border-black dark:border-primary border max-w-fit px-1 py-0.5">
      {category}
    </div>
  );
}

function OtherVersionImages({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-14 h-14 md:w-16 md:h-16">
      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

function DifferentSizes({ size }: { size: string }) {
  return (
    <div className="border-1 cursor-pointer uppercase border-black dark:border-primary border max-w-fit px-2 md:px-3 py-1">
      {size}
    </div>
  );
}
