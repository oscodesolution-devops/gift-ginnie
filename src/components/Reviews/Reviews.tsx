import { motion } from "framer-motion";
import { IoStarSharp } from "react-icons/io5";
import { getReviews } from "../../api/api";
import { useAuth } from "../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import ReviewSkeleton from "./ReviewSkeleton";

type TReviews = {
  id: number;
  product_id: number;
  rating: number;
  review: string;
  user_id: number;
  created_at: string;
};

export default function Reviews({ productId }: { productId: number }) {
  const { accessToken } = useAuth();
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => getReviews(accessToken as string, productId),
    enabled: !!accessToken && !!productId,
  });

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="mb-6 ">
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
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
          {reviews?.data?.ratings?.map((review: TReviews) => (
            <div
              key={`${review.id}`}
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
              <div className="text-gray-500">- user {review.user_id}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
