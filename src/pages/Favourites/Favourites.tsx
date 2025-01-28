import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLikeItems } from "../../api/api";
import { useAuth } from "../../context/Auth";
import FavouritesSkeleton from "./FavouritesSkeleton";
type TFavourites = {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    category: {
      id: number;
      name: string;
      description: string;
      image: string;
    };
    images: Array<{
      id: number;
      image: string;
      product: number;
    }>;
    in_stock: boolean;
    rating: null;
    original_price: string;
    selling_price: string;
    brand: string;
    product_type: string;
    is_liked: boolean;
  };
};

// You might need this wrapper interface depending on your API response

export default function Favourites() {
  const { accessToken } = useAuth();
  const {
    data: likedItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likedItems", accessToken],
    queryFn: async () => getLikeItems(accessToken as string),
    enabled: !!accessToken,
  });

  if (isLoading) {
    return <FavouritesSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Add this to see the exact structure
  console.log("Liked Items Structure:", likedItems);

  // Check if there are no items
  if (!likedItems || !likedItems.data || likedItems.data.length === 0) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center flex-col py-8 px-4 dark:text-white">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-4xl uppercase font-bold mb-6">
            You have no liked items
          </h1>
          <Link
            to="/products"
            className="text-lg dark:bg-primary font-medium bg-black uppercase py-3 px-5 text-primary dark:text-primaryDark"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col py-8 px-4 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 mt-4">Your Liked Items</h1>
      {likedItems.data.map((item: TFavourites) => (
        <div
          key={item.id}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[35%_65%] gap-10 mb-10"
        >
          {/* Image Section (35%) */}
          <div className="w-full dark:border-white dark:border-2 flex items-center justify-center rounded-lg p-4 shadow-md">
            <img
              className="w-full h-auto max-h-32 object-cover rounded-md"
              src={item.product.category.image}
              alt={item.product.name}
            />
          </div>
          {/* Details Section (65%) */}
          <div className="w-full dark:border-white dark:border-2 flex flex-col justify-between gap-4 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{item.product.name}</div>
            </div>
            <div className="text-sm leading-6">
              {item.product.description.slice(0, 100)}...
            </div>
            <div className="flex justify-start gap-4 items-center text-lg">
              <div className="font-medium dark:text-white/80">
                Rs {item.product.selling_price}
              </div>
              <div className="font-extralight line-through dark:text-white/40">
                Rs {item.product.original_price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
