// hooks/useRazorpay.ts
import { useEffect, useState } from "react";

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      setIsLoaded(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
};

// types/order.ts
export interface OrderResponse {
  amount: number;
  currency: string;
  razorpay_order_id: string;
}

export interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// components/Order.tsx
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { checkout, verifyPayment } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const isRazorpayLoaded = useRazorpay();

  const address_id = location.state?.address_id;

  const verifyMutation = useMutation({
    mutationFn: (paymentData: PaymentResponse) =>
      verifyPayment(accessToken as string, paymentData),
    onSuccess: () => {
      toast.success("Payment successful!");
      // Navigate to success page or order history
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Payment verification failed:", error);
      toast.error("Payment verification failed. Please contact support.");
    },
  });

  const handlePayment = async (data: OrderResponse) => {
    if (!(window as any).Razorpay) {
      toast.error("Payment gateway failed to load. Please refresh the page.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpay_order_id,
      handler: async (response: PaymentResponse) => {
        console.log("Payment Response:", response);
        verifyMutation.mutate(response);
      },

      theme: {
        color: "#5f63b8",
      },
    };

    try {
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Razorpay initialization failed:", error);
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!address_id) {
        throw new Error("Address ID is missing.");
      }
      if (!accessToken) {
        throw new Error("User not authenticated.");
      }
      return await checkout(accessToken, address_id);
    },
    onSuccess: (data) => {
      console.log("Order created successfully:", data);
      handlePayment(data);
    },
    onError: (error: Error) => {
      console.error("Order creation failed:", error);
      toast.error(error.message || "Failed to create order.");
    },
  });

  const isLoading = checkoutMutation.isPending || verifyMutation.isPending;

  return (
    <div className="max-w-4xl mx-auto p-4 flex-col min-h-screen flex items-center justify-center px-4 py-12 bg-primary dark:bg-primaryDark  text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>
      <Toaster />

      {!address_id && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-yellow-700">
            Please select a delivery address first.
          </p>
        </div>
      )}

      <button
        onClick={() => checkoutMutation.mutate()}
        disabled={isLoading || !isRazorpayLoaded || !address_id}
        className="w-full md:w-auto px-6 py-3 bg-black dark:bg-white text-white uppercase font-bold dark:text-black rounded-md 
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                 transition-colors duration-200"
      >
        {isLoading
          ? "Processing..."
          : !isRazorpayLoaded
          ? "Loading payment gateway..."
          : !address_id
          ? "Select address to continue"
          : "Proceed to Payment"}
      </button>

      {(checkoutMutation.error || verifyMutation.error) && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">
            {checkoutMutation.error?.message || verifyMutation.error?.message}
          </p>
        </div>
      )}
    </div>
  );
}
