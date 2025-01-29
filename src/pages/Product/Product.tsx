import { useState, useRef, useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Reviews from "../../components/Reviews/Reviews";
import Trending from "../../components/TrendingSection/Trending";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/api";
import { useAuth } from "../../context/Auth";
import { TProduct } from "../../types/Types";
import { useParams } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import { useCart } from "../../context/AddToCart";
import toast from "react-hot-toast";
import ReviewComponent from "../../components/Review/Review";

export default function Product() {
  const { productId } = useParams();
  const { accessToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", token, productId],
    queryFn: async () => {
      if (!token || !productId) {
        throw new Error("Missing token or productId");
      }
      return getProduct(token, parseInt(productId, 10));
    },
    enabled: !!accessToken && !!productId, // Ensure both token and productId are available
  });

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [accessToken]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ProductInfo product={product.data as TProduct} />;
}

function ProductInfo({ product }: { product: TProduct }) {
  const { addToCart, addToCartState, resetAddToCartState } = useCart();

  // state to keep track of quantity
  const [quantity, setQuantity] = useState(1);
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

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product.id, quantity);
    } else {
      alert("Please select a valid quantity.");
    }
  };

  useEffect(() => {
    if (addToCartState.isSuccess) {
      toast.success("Product added to cart successfully!");
      resetAddToCartState();
    }

    if (addToCartState.isError) {
      toast.error("Failed to add product to cart. Please try again.");
    }
  }, [addToCartState, resetAddToCartState]);

  console.log(product);

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
            <div>
              <div className="flex justify-between items-center cursor-pointer w-full">
                <span className="font-bold">description</span>
              </div>

              <p className="py-5 text-sm">{product.brand}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-black dark:bg-primary text-white font-bold dark:text-black uppercase py-3 px-6"
                disabled={addToCartState.isLoading}
              >
                {addToCartState.isLoading ? "ADDING..." : "ADD TO CART"}
              </button>
              <div className="flex items-center gap-4">
                <button
                  className="text-xl rounded-full bg-primaryDark dark:bg-primary text-white dark:text-black w-8 h-8 flex items-center justify-center"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <p className="text-lg font-medium">{quantity}</p>
                <button
                  className="text-xl rounded-full bg-primaryDark dark:bg-primary text-white dark:text-black w-8 h-8 flex items-center justify-center"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewComponent />
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
