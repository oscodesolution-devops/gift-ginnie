import { useState, useRef, useEffect, } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Hero from "../../components/Hero/Hero";
import Reviews from "../../components/Reviews/Reviews";
import Trending from "../../components/TrendingSection/Trending";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/api";
import { useAuth } from "../../context/Auth";

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

type TProduct = {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  images: {
    id: number;
    image: string;
    product: number;
  }[];
  in_stock: boolean;
  rating: number;
  original_price: string;
  selling_price: string;
  brand: string;
  product_type: string;
  is_liked: boolean;
};

export default function Product() {
  const { accessToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", accessToken],
    queryFn: async () => getProduct(token as string, 39),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      setToken(accessToken);
    }
  }, [accessToken]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(product, "product");

  return <ProductInfo product={product.data as TProduct} />;
}

function ProductInfo({ product }: { product: TProduct }) {
  const [openDescription, setOpenDescription] = useState(-1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(product.category.image);

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
            src={activeImage}
            alt={product.name}
          />
        </div>

        {/* Content container - Responsive adjustments */}
        <div
          ref={contentRef}
          className="dark:text-primary md:h-[calc(100vh-2rem)] md:overflow-y-auto custom-scrollbar"
        >
          <div className="flex flex-col gap-4 border-b dark:border-white/30 pb-6">
            <div>{product.category.name}</div>
            <div className="font-bold text-3xl md:text-5xl">{product.name}</div>
            <div className="flex gap-2 flex-wrap">
              <CategoryStyle category={product.product_type} />
            </div>
          </div>

          <div className="flex justify-between items-center py-6 border-b dark:border-white/30">
            <div className="text-lg md:text-xl font-thin">
              ${product.original_price}
            </div>
            <div className="flex gap-4 text-sm">
              <div className="line-through">${product.selling_price}</div>
              <div className="bg-black/10 px-1 dark:bg-white/10">
                {Math.round(
                  (1 -
                    parseInt(product.selling_price) /
                      parseInt(product.original_price)) *
                    100
                )}
                %
              </div>
            </div>
          </div>

          <div className="py-6 border-b dark:border-white/30 flex flex-col gap-4">
            <div>Choose Other Versions</div>
            <div className="flex gap-2 flex-wrap">
              <OtherVersionImages
                imageUrl={product.category.image}
                setActiveImage={setActiveImage}
              />
              {product.images.map((image) => (
                <OtherVersionImages
                  imageUrl={image.image}
                  key={image.id}
                  setActiveImage={setActiveImage}
                />
              ))}
            </div>
          </div>

          {/* <div className="py-6 border-b dark:border-white/30 flex flex-col gap-4">
            <div>Choose the size</div>
            <div className="flex gap-2 flex-wrap">
              <DifferentSizes size="S" />
              <DifferentSizes size="M" />
              <DifferentSizes size="L" />
              <DifferentSizes size="XL" />
            </div>
          </div> */}

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
      <Trending />
      <Subscribe />
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

function OtherVersionImages({
  imageUrl,
  setActiveImage,
}: {
  imageUrl: string;
  setActiveImage: (imageUrl: string) => void;
}) {
  return (
    <div
      className="w-14 h-14 md:w-16 md:h-16 cursor-pointer"
      onClick={() => setActiveImage(imageUrl)}
    >
      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

// function DifferentSizes({ size }: { size: string }) {
//   return (
//     <div className="border-1 cursor-pointer uppercase border-black dark:border-primary border max-w-fit px-2 md:px-3 py-1">
//       {size}
//     </div>
//   );
// }
