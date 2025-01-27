import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./Auth";
import axios from "axios";

interface CartItem {
  product_id: number;
  quantity: number;
}

interface MutationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

interface AddToCartType {
  cartItemsCount: number;
  initialCartCount: number;
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartLoading: boolean;
  addToCartState: MutationState;
  removeFromCartState: MutationState;
  resetAddToCartState: () => void;
  resetRemoveFromCartState: () => void;
  initialCartLoading: boolean;
}

const initialMutationState: MutationState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const AddToCartContext = createContext<AddToCartType>({
  cartItemsCount: 0,
  initialCartCount: 0,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartLoading: false,
  addToCartState: initialMutationState,
  removeFromCartState: initialMutationState,
  resetAddToCartState: () => {},
  resetRemoveFromCartState: () => {},
  initialCartLoading: false,
});

const API_BASE_URL = "http://18.218.49.219:8000/api/v1";

export const AddToCart: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const [addToCartState, setAddToCartState] = useState<MutationState>(initialMutationState);
  const [removeFromCartState, setRemoveFromCartState] = useState<MutationState>(initialMutationState);
  const [initialCartCount, setInitialCartCount] = useState<number>(0);

  // Reset functions for mutation states
  const resetAddToCartState = () => setAddToCartState(initialMutationState);
  const resetRemoveFromCartState = () => setRemoveFromCartState(initialMutationState);

  // Initial cart count query
  const { data: initialCartData, isLoading: initialCartLoading } = useQuery({
    queryKey: ["initialCart", accessToken],
    queryFn: async () => {
      if (!accessToken) return null;
      const response = await axios.get(`${API_BASE_URL}/cart/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    enabled: !!accessToken,
  });

  // Current cart items query
  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["cart", accessToken],
    queryFn: async () => {
      if (!accessToken) return null;
      const response = await axios.get(`${API_BASE_URL}/cart/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    enabled: !!accessToken,
  });

  // Set initial cart count when data is available
  useEffect(() => {
    if (initialCartData?.data?.items) {
      setInitialCartCount(initialCartData.data.items.length);
    }
  }, [initialCartData]);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const response = await axios.post(
        `${API_BASE_URL}/cart/item/`,
        { product_id: productId, quantity },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    onMutate: () => {
      setAddToCartState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setAddToCartState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });
      setTimeout(resetAddToCartState, 3000);
    },
    onError: (error: Error) => {
      setAddToCartState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error,
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/item/${productId}/`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    onMutate: () => {
      setRemoveFromCartState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setRemoveFromCartState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
      });
      setTimeout(resetRemoveFromCartState, 3000);
    },
    onError: (error: Error) => {
      setRemoveFromCartState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error,
      });
    },
  });

  const contextValue: AddToCartType = {
    cartItemsCount: cartData?.data?.items?.length || 0,
    initialCartCount,
    cartItems: cartData?.data?.items || [],
    addToCart: (productId: number, quantity: number) =>
      addToCartMutation.mutate({ productId, quantity }),
    removeFromCart: (productId: number) =>
      removeFromCartMutation.mutate(productId),
    cartLoading,
    addToCartState,
    removeFromCartState,
    resetAddToCartState,
    resetRemoveFromCartState,
    initialCartLoading,
  };

  return (
    <AddToCartContext.Provider value={contextValue}>
      {children}
    </AddToCartContext.Provider>
  );
};

export const useCart = () => useContext(AddToCartContext);