import { motion } from "framer-motion";
import { IoStarSharp } from "react-icons/io5";

const reviews = [
  {
    rating: 5,
    review:
      "Love these jeans! They're comfy, stylish, and durable. Perfect for everyday wear. Highly recommend!",
    name: "Steve",
  },
  {
    rating: 4,
    review: "Great fit, but the color faded a little after washing.",
    name: "Anna",
  },
  {
    rating: 5,
    review:
      "Amazing quality! I've been wearing them for months with no issues.",
    name: "Mark",
  },
  {
    rating: 3,
    review:
      "Comfortable but not true to size. Had to exchange for a larger size.",
    name: "Sophia",
  },
  {
    rating: 5,
    review: "Stylish and fits perfectly. These are my favorite jeans now!",
    name: "John",
  },
];

export default function Reviews() {
  return (
    <div>
      <div className="mb-6 ">
        <div className="w-full text-center uppercase font-bold text-3xl px-4 sm:text-4xl mb-4 dark:text-white">
          THE OPINION OF OUR CUSTOMERS
        </div>
        <div className="w-full text-center uppercase font-bold text-xl px-4 sm:text-2xl mb-14 dark:text-white/70">
          OVER 1.000 SATISFIED CUSTOMERS
        </div>
      </div>
      <div className="w-full relative overflow-hidden">
        <motion.div
          className="flex gap-4 px-4 md:px-8"
          animate={{
            x: [0, -3000], // Adjusted to match the new total content width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50, // Adjusted for smoother scrolling
              ease: "linear",
            },
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex flex-shrink-0 justify-between w-[400px] overflow-hidden flex-col gap-3 border-2 p-4 rounded-lg shadow-md dark:text-primary"
            >
              {/* Rating */}
              <div className="flex gap-2 items-center">
                {Array.from({ length: review.rating }, (_, i) => (
                  <IoStarSharp key={i} />
                ))}
                <div>{review.rating}/5</div>
              </div>
              {/* Review */}
              <div>{review.review}</div>
              {/* Name */}
              <div className="text-gray-500">- {review.name}</div>
            </div>
          ))}
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex flex-shrink-0 justify-between w-[400px] overflow-hidden flex-col gap-3 border-2 p-4 rounded-lg shadow-md dark:text-primary"
            >
              {/* Rating */}
              <div className="flex gap-2 items-center">
                {Array.from({ length: review.rating }, (_, i) => (
                  <IoStarSharp key={i} />
                ))}
                <div>{review.rating}/5</div>
              </div>
              {/* Review */}
              <div>{review.review}</div>
              {/* Name */}
              <div className="text-gray-500">- {review.name}</div>
            </div>
          ))}
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex flex-shrink-0 justify-between w-[400px] overflow-hidden flex-col gap-3 border-2 p-4 rounded-lg shadow-md dark:text-primary"
            >
              {/* Rating */}
              <div className="flex gap-2 items-center">
                {Array.from({ length: review.rating }, (_, i) => (
                  <IoStarSharp key={i} />
                ))}
                <div>{review.rating}/5</div>
              </div>
              {/* Review */}
              <div>{review.review}</div>
              {/* Name */}
              <div className="text-gray-500">- {review.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
