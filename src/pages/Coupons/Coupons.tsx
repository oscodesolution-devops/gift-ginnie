import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { applyCoupon, getCoupons, removeCoupon } from "../../api/api";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface CouponResponse {
  data: TCoupon[];
  message: string;
}

interface TCoupon {
  id: number;
  code: string;
  title: string | null;
  description: string | null;
  discount_type: "FLAT" | "PERCENTAGE";
  discount_value: string;
  max_usage: number | null;
  max_usage_per_user: number | null;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
}

interface ApiResponse {
  message: string;
}

const CouponManagement: React.FC = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<TCoupon | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<TCoupon | null>(null);
  const { accessToken } = useAuth();

  const {
    data: couponsResponse,
    isLoading: isLoadingCoupons,
    error: couponsError,
  } = useQuery<CouponResponse>({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(accessToken as string),
    enabled: !!accessToken,
  });

  // Filter valid coupons
  const validCoupons =
    couponsResponse?.data.filter(
      (coupon) => coupon.valid_until >= new Date().toISOString()
    ) || [];

  const applyMutation = useMutation<ApiResponse, Error, string>({
    mutationFn: (code: string) => applyCoupon(accessToken as string, code),
    onSuccess: (data) => {
      if (selectedCoupon) {
        setAppliedCoupon(selectedCoupon);
        setSelectedCoupon(null);
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to apply coupon");
    },
  });

  const removeMutation = useMutation<ApiResponse, Error, void>({
    mutationFn: () => removeCoupon(accessToken as string),
    onSuccess: (data) => {
      setAppliedCoupon(null);
      setSelectedCoupon(null);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove coupon");
    },
  });

  const handleCouponSelect = (coupon: TCoupon) => {
    if (appliedCoupon) {
      toast.error(
        "Please remove the applied coupon first before selecting a new one"
      );
      return;
    }
    setSelectedCoupon(coupon);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleApplyCoupon = () => {
    if (appliedCoupon) {
      toast.error("Please remove the current coupon before applying a new one");
      return;
    }
    if (selectedCoupon) {
      applyMutation.mutate(selectedCoupon.code);
    }
  };

  const handleRemoveCoupon = () => {
    removeMutation.mutate();
  };

  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto p-6 mt-20 bg-white dark:bg-black dark:text-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Coupon Management</h1>
        <Link to="/address">
          <button className="lg:text-xl font-semibold text-white bg-black px-2 py-1 uppercase mb-6">
            Continue
          </button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Applied Coupon Section */}
        {appliedCoupon && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Applied Coupon</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-green-800">
                    {appliedCoupon.title || appliedCoupon.code}
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    {appliedCoupon.description || "No description"}
                  </p>
                  <p className="text-sm font-medium text-green-800 mt-2">
                    {appliedCoupon.discount_type === "FLAT"
                      ? `₹${appliedCoupon.discount_value} off`
                      : `${appliedCoupon.discount_value}% off`}
                  </p>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  disabled={removeMutation.isPending}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Coupon Selection Area */}
        {!appliedCoupon && (
          <div className="flex gap-4">
            <div className="flex-1 px-4 py-2 border rounded-lg">
              {selectedCoupon?.code || "Select a coupon"}
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={applyMutation.isPending || !selectedCoupon}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applyMutation.isPending ? "Applying..." : "Apply Coupon"}
            </button>
          </div>
        )}

        {/* Error display */}
        {couponsError && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <FiAlertCircle className="flex-shrink-0" />
            <p>{couponsError.message}</p>
          </div>
        )}

        {/* Available Coupons */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Coupons</h2>
          {isLoadingCoupons ? (
            <div className="text-center text-gray-500">Loading coupons...</div>
          ) : validCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {validCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="border p-4 rounded-lg transition-shadow cursor-pointer"
                  onClick={() => !appliedCoupon && handleCouponSelect(coupon)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold dark:text-white">
                      {coupon.title || coupon.code}
                    </h3>
                    {appliedCoupon?.id === coupon.id ? (
                      <p className="text-sm mt-1 bg-blue-500 px-2 py-1 uppercase font-semibold text-white">
                        Applied
                      </p>
                    ) : (
                      <p className="text-sm mt-1 bg-green-500 px-2 py-1 uppercase font-semibold text-white">
                        Valid
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-white-600 mt-1">
                    {coupon.description || "No description"}
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      selectedCoupon?.id === coupon.id
                        ? "dark:text-black"
                        : "dark:text-white"
                    }`}
                  >
                    {coupon.discount_type === "FLAT"
                      ? `₹${coupon.discount_value} off`
                      : `${coupon.discount_value}% off`}
                  </p>
                  <p className="text-xs dark:text-white mt-2">
                    Valid until:{" "}
                    {new Date(coupon.valid_until).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No valid coupons available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;
