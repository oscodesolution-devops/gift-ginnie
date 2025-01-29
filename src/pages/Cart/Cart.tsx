import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getCartProducts, getCoupons } from "../../api/api";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/AddToCart";
import toast from "react-hot-toast";
import CartSkeleton from "./CartSkeleton";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

type TCartItem = {
  id: number;
  cart: number;
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
    images: [
      {
        id: number;
        image: string;
        product: number;
      }
    ];
    in_stock: boolean;
    rating: null;
    original_price: string;
    selling_price: string;
    brand: string;
    product_type: string;
    is_liked: boolean;
  };
  quantity: number;
  price: string;
};

export type TCartResponse = {
  data: {
    id: number;
    user: number;
    items: TCartItem[];
    coupon: null;
    total_items: number;
    original_price: number;
    discounted_price: number;
    discount_percentage: number;
  };
};

export default function Cart() {
  const { accessToken } = useAuth();
  const {
    updateToCart,
    updateToCartState,
    resetUpdateToCartState,
    removeFromCart,
    removeFromCartState,
    resetRemoveFromCartState,
  } = useCart();

  const [loadingItems, setLoadingItems] = useState<number>(-1);

  const [token, setToken] = useState<string | null>(null);
  const {
    data: cartItems,
    isLoading,
    error,
    refetch: refetchCartItems,
  } = useQuery({
    queryKey: ["cartItems", token],
    queryFn: async () => getCartProducts(token as string),
    enabled: !!token,
  });
  const {
    data: coupon,
    isLoading: couponLoading,
    error: couponError,
  } = useQuery({
    queryKey: ["coupons", token],
    queryFn: async () => getCoupons(token as string),
    enabled: !!token,
  });
  useEffect(() => {
    if (updateToCartState.isSuccess) {
      toast.success("Quantity updated successfully.");
      resetUpdateToCartState();
      refetchCartItems();
    }

    if (updateToCartState.isError) {
      toast.error("Failed to add product to cart. Please try again.");
    }
    setLoadingItems(-1); // Reset loading state
  }, [updateToCartState, resetUpdateToCartState, refetchCartItems]);
  useEffect(() => {
    if (removeFromCartState.isSuccess) {
      toast.success("Item removed from cart successfully.");
      resetRemoveFromCartState();
      refetchCartItems();
    }

    if (removeFromCartState.isError) {
      toast.error("Failed to remove product from cart. Please try again.");
    }
  }, [removeFromCartState, resetRemoveFromCartState, refetchCartItems]);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [accessToken]);

  if (isLoading) {
    return <CartSkeleton cartItems={cartItems} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(coupon);

  const handleUpdateCart = (
    productId: number,
    quantity: number,
    itemId: number
  ) => {
    if (quantity > 0) {
      setLoadingItems(itemId); // Set loading state for the current item by ID
      updateToCart(productId, quantity);
    } else {
      alert("Please select a valid quantity.");
    }
  };

  const handleDeleteCart = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col py-8 px-4 dark:text-white">
      {cartItems?.data?.items.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-4xl uppercase font-bold mb-6">
            Your Cart is empty
          </h1>
          <Link
            to="/products"
            className="text-lg dark:bg-primary  font-medium bg-black uppercase py-3 px-5 text-primary dark:text-primaryDark"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6 mt-4">Your Cart</h1>
          {cartItems?.data?.items.map((item: TCartItem) => (
            <div
              key={item.id}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[35%_65%] gap-5 mb-10"
            >
              {/* Image Section (35%) */}
              <div className="w-full dark:border-white dark:border-2 flex items-center justify-center rounded-lg p-4 shadow-md">
                <img
                  className="w-full h-auto max-h-72 object-cover rounded-md"
                  src={item.product.category.image}
                  alt={item.product.name}
                />
              </div>
              {/* Details Section (65%) */}
              <div className="w-full dark:border-white dark:border-2 flex flex-col justify-between gap-4 rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{item.product.name}</div>
                  <div>
                    <button onClick={() => handleDeleteCart(item.id)}>
                      <MdDelete className="text-3xl cursor-pointer text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="text-sm leading-6">
                  {item.product.description.slice(0, 100)}...
                </div>
                <div>
                  {item.product.in_stock ? (
                    <div className="text-green-500">In Stock</div>
                  ) : (
                    <div className="text-red-500">Out of Stock</div>
                  )}
                </div>
                <div className="flex justify-start gap-4 items-center text-lg">
                  <div className="font-medium dark:text-white/80">
                    Rs {item.product.selling_price}
                  </div>
                  <div className="font-extralight line-through dark:text-white/40">
                    Rs {item.product.original_price}
                  </div>
                </div>
                <div className="flex justify-start gap-4 items-center text-md">
                  Total Quantity: {item.quantity}
                </div>
                <div className="flex justify-start gap-4 items-center text-md">
                  Total Price: {item.price}
                </div>
                <div className="flex items-center gap-4">
                  {updateToCartState.isLoading && loadingItems === item.id ? ( // Match loadingItems with item.id
                    <div>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        className="text-xl rounded-full bg-primaryDark dark:bg-primary text-white dark:text-black w-8 h-8 flex items-center justify-center"
                        onClick={() =>
                          handleUpdateCart(item.id, item.quantity - 1, item.id)
                        } // Decrease quantity
                        aria-label="Decrease quantity"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <p className="text-lg font-medium">{item.quantity}</p>
                      <button
                        className="text-xl rounded-full bg-primaryDark dark:bg-primary text-white dark:text-black w-8 h-8 flex items-center justify-center"
                        aria-label="Increase quantity"
                        disabled={!item.product.in_stock}
                        onClick={() =>
                          handleUpdateCart(item.id, item.quantity + 1, item.id)
                        } // Increase quantity
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 p-6 gap-10 dark:bg-black  border-2 border-white rounded-lg mb-10 shadow-lg">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                <span className="text-gray-400">
                  Total Items: {cartItems?.data?.total_items}
                </span>
              </div>
              <div className="text-lg font-semibold">
                <span className="text-gray-400">
                  Original Price: {cartItems?.data?.original_price}₹
                </span>
              </div>
              <div className="text-lg font-semibold">
                <span className="text-gray-400">
                  Discounted Price: {cartItems?.data?.discounted_price}₹
                </span>
              </div>
              <div className="text-lg font-semibold">
                <span className="text-gray-400">
                  Discount Percentage: {cartItems?.data?.discount_percentage}%
                </span>
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <Link to="/coupons">
                <button
                  disabled={
                    !cartItems?.data?.items.every(
                      (item: TCartItem) => item.product.in_stock === true
                    )
                  }
                  className="bg-primaryDark dark:bg-primary disabled:cursor-not-allowed uppercase font-bold text-white py-2 px-5 dark:text-black"
                >
                  Proceed
                </button>
              </Link>
              {!cartItems?.data?.items.every(
                (item: TCartItem) => item.product.in_stock === true
              ) && (
                <p className="text-sm mt-2 text-red-500">
                  Remove the items which are out of stock
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
