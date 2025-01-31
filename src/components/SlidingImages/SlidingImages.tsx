import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCarouselImages } from "../../api/api";
import CarouselImagesLoading from "./SkeletonLoading";

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

  if (isLoading) {
    return <CarouselImagesLoading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}
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
            {<div>{JSON.stringify(image.description)}</div>}
          </motion.div>
        ))}

        {/* Duplicate set of images for seamless loop */}
      </motion.div>
    </div>
  );
}
