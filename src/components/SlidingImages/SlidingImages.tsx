import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCarouselImages } from "../../api/api";
import CarouselImagesLoading from "./SkeletonLoading";
import { useState, useEffect } from "react";

type TCarouselItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string | null;
  is_active: boolean;
};

export default function ImageGallery() {
  const {
    data: carouselItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["carouselItems"],
    queryFn: async () => getCarouselImages(),
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Set up an interval for the automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % carouselItems?.data?.length
      );
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [carouselItems]);

  if (isLoading) {
    return <CarouselImagesLoading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      id="default-carousel"
      className="relative w-full px-4 sm:px-16 md:px-24"
      data-carousel="slide"
    >
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {carouselItems?.data?.map((item: TCarouselItem, index: number) => (
          <motion.div
            key={item.id}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={item.image}
              className="w-full h-full object-cover"
              alt={item.title}
            />
          </motion.div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {carouselItems?.data?.map((item: TCarouselItem, index: number) => (
          <button
            key={item.id}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-current={index === currentIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="absolute top-1/2 left-0 z-30 flex items-center justify-center h-10 w-10 transform -translate-y-1/2 px-8 cursor-pointer group focus:outline-none  sm:px-20 md:px-28"
        data-carousel-prev
        onClick={() =>
          setCurrentIndex(
            (prevIndex) =>
              (prevIndex - 1 + carouselItems?.data.length) %
              carouselItems?.data.length
          )
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-10 w-10 transform -translate-y-1/2 px-8 cursor-pointer group focus:outline-none sm:px-20 md:px-28"
        data-carousel-next
        onClick={() =>
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % carouselItems?.data.length
          )
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
