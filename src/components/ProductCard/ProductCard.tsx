import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addLikeItem } from "../../api/api";
import { useAuth } from "../../context/Auth";
import { TProduct } from "../../types/Types";

export default function ProductCard({ card }: { card: TProduct }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer" key={card.id}>
      <div className="relative">
        <Link to={`/product/${card.id}`}>
          <img
            src={card.images[0].image}
            alt={card.name}
            className="w-full h-64 object-cover"
          />
          <div className="uppercase bg-[#E4E3E0] dark:bg-black/70 dark:text-white/70 rounded-sm text-sm absolute top-5 right-4 px-2 py-1">
            {card.in_stock ? "In Stock" : "Out of Stock"}
          </div>
        </Link>
        {/* Like button outside of Link */}
        <LikeButton isLiked={card.is_liked} cardId={card.id} />
      </div>
      <Link to={`/product/${card.id}`}>
        <div className="flex justify-between items-center">
          <div className="font-bold">{card.name}</div>
          <div className="bg-white dark:bg-[#1A1A1A] px-1 rounded-sm">
            {Math.round(
              (1 -
                parseInt(card.selling_price) / parseInt(card.original_price)) *
                100
            )}
            %
          </div>
        </div>
        <div className="flex justify-between items-center text-lg">
          <div className="font-medium dark:text-white/80">
            ₹{card.selling_price}
          </div>
          <div className="font-extralight line-through dark:text-white/40">
            ₹{card.original_price}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function LikeButton({
  isLiked,
  cardId,
}: {
  isLiked: boolean;
  cardId: number;
}) {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        // Instead of showing toast here, throw an error
        throw new Error("Unauthorized");
      }
      return addLikeItem(accessToken, cardId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success(data.message);
    },
    onError: (error: Error) => {
      console.log(error, "===============");
      if (error.message === "Unauthorized") {
        toast.error("Please login to like products");
      } else {
        toast.error("Failed to add item to liked list");
      }
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
    mutation.mutate();
  };
  console.log(isLiked);

  return (
    <div
      onClick={handleLikeClick}
      className={`absolute top-5 left-2 text-xl bg-[#E4E3E0] dark:bg-black/70 rounded-md px-2 py-2 hover:bg-[#E4E3E0]/70 cursor-pointer ${
        isLiked ? "text-red-500" : "dark:text-white/70"
      }`}
    >
      {mutation.isPending ? (
        <div className="flex items-center justify-center ">
          <div className="w-full h-full px-2 py-2 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
        </div>
      ) : isLiked ? (
        <FaHeart />
      ) : (
        <FaHeart />
      )}
    </div>
  );
}
