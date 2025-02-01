import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { postRating } from "../../api/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";

export default function ReviewComponent() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const { productId } = useParams();
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ rating, review }: { rating: number; review: string }) => {
      return postRating(
        accessToken as string,
        parseInt(productId as string),
        rating,
        review
      );
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (error) => {
      if (error?.response?.data?.message)
        return toast.error(error?.response?.data.message);
      toast.error("Not able to add the rating");
    },
  });

  console.log(rating);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    setRating(0);
    setReview("");
    mutation.mutate({ rating, review });
  };

  return (
    <div className="p-6 rounded-lg my-10 shadow-lg bg-white dark:bg-black dark:text-white dark:border-2 dark:border-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3">Rate Your Experience</h2>

      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full dark:bg-black placeholder:dark:bg-black placeholder:dark:text-white p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-black focus:dark:ring-white"
        rows={3}
      />

      <button
        className="mt-3 w-full bg-black dark:bg-white text-white py-2 rounded-md uppercase dark:text-black font-semibold"
        onClick={handleSubmit}
      >
        Post Review
      </button>
    </div>
  );
}
