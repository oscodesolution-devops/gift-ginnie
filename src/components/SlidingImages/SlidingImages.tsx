import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/Auth";
import { getCarouselImages } from "../../api/api";
import { useEffect, useState } from "react";
import CarouselImagesLoading from "./SkeletonLoading";

const placeholderImages = [
  {
    image:
      "https://framerusercontent.com/images/GkRJl51IhHmJvnNeCmFnbB0ezo.jpg?scale-down-to=1024",
  },
  {
    image:
      "https://framerusercontent.com/images/GNelpZER4VkecRL4B6cY73L5JS0.jpg?scale-down-to=1024",
  },
  {
    image:
      "https://framerusercontent.com/images/Bq5I78AORSOzHsg2q1fkPZOl6Co.jpg?scale-down-to=1024",
  },
  {
    image:
      "https://framerusercontent.com/images/8Z9p0LKQY9gubYPEsAtkcqzsntg.jpg?scale-down-to=512",
  },
  {
    image:
      "https://framerusercontent.com/images/WukvQNYKmEKpqB61Bdbr8pwmyGU.jpg?scale-down-to=1024",
  },
  {
    image:
      "https://framerusercontent.com/images/WxVQ1cntvpK0AV4sb5W2W36Ziak.jpg?scale-down-to=1024",
  },
  {
    image:
      "https://framerusercontent.com/images/oXIscdzz1nkPs40GBg162nrl4.jpg?scale-down-to=1024",
  },
];

type TCarouselItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  is_active: boolean;
};

export default function ImageGallery() {
  const { accessToken, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const {
    data: carouselItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["carouselItems", token],
    queryFn: async () => getCarouselImages(token as string),
    enabled: !!token,
  });

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [token, accessToken]);

  if (isLoading) {
    return <CarouselImagesLoading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return isAuthenticated ? (
    <div className="w-full relative overflow-hidden">
      <motion.div
        className="flex gap-4 px-4 md:px-8"
        animate={{
          x: [0, -1400], // Adjust this value based on your total content width
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set of images */}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`first-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Duplicate set of images for seamless loop */}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`second-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`third-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`third-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`third-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`third-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {carouselItems?.data.map((image: TCarouselItem, index: number) => (
          <motion.div
            key={`third-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <div className="w-full relative overflow-hidden">
      <motion.div
        className="flex gap-4 px-4 md:px-8"
        animate={{
          x: [0, -1400], // Adjust this value based on your total content width
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set of images */}
        {placeholderImages.map((image, index: number) => (
          <motion.div
            key={`first-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {placeholderImages.map((image, index: number) => (
          <motion.div
            key={`first-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {placeholderImages.map((image, index: number) => (
          <motion.div
            key={`first-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[300px] rounded-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        
      </motion.div>
    </div>
  );
}
