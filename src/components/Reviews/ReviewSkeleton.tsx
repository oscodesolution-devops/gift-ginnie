import { motion } from "motion/react";

const ReviewSkeleton = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="w-full text-center uppercase font-bold text-3xl px-4 sm:text-4xl mb-4 dark:text-white">
          THE OPINION OF OUR CUSTOMERS
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
          {/* Skeleton Loader for Each Review */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex flex-shrink-0 justify-between w-[400px] overflow-hidden flex-col gap-3 border-2 p-4 rounded-lg shadow-md animate-pulse dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Rating Skeleton */}
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="w-12 h-4 bg-gray-400 rounded-md"></div>
              </div>
              {/* Review Skeleton */}
              <div className="w-full h-12 bg-gray-400 rounded-md"></div>
              {/* Name Skeleton */}
              <div className="w-24 h-4 bg-gray-400 rounded-md"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
