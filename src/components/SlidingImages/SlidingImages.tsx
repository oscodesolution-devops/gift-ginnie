import { motion, useScroll, useTransform } from "framer-motion";

const heroImages = [
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

export default function ImageGallery() {
  const { scrollYProgress } = useScroll();

  // Reduced movement range for smaller scroll effect
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -200] // Smaller pixel range for subtle movement
  );

  return (
    <div className="w-full relative overflow-hidden">
      <motion.div className="flex gap-4 px-4 md:px-8" style={{ x }}>
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
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
