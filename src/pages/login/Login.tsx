import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState<string>("91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: () => sendOTP(phoneNumber, countryCode),
    onSuccess: (data) => {
      toast.success("OTP sent successfully");
      setPhoneNumber("");
      setCountryCode("91");

      navigate("/otp", {
        state: {
          authToken: data.data.authToken,
          verificationId: data.data.verification_id,
          phoneNumber: phoneNumber,
          countryCode: countryCode,
        },
      });
      setError(null);
    },
    onError: (err: any) => {
      console.error("OTP send failed", err);
      setError(err.response?.data?.message || "An unexpected error occurred");
      toast.error("OTP send failed");
    },
  });

  const handleLogin = () => {
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Phone number should be 10 digits");
      return;
    }
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-primaryDark px-4">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white dark:bg-black border border-gray-200 dark:border-white/20">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Login
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <div className="flex items-center gap-3 mb-5">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryLight dark:border-gray-600 dark:bg-black dark:text-white"
          >
            <option value="91">+91 (India)</option>
          </select>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryLight dark:border-gray-600 dark:bg-black dark:text-white"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full p-2 text-lg font-medium bg-primaryDark dark:bg-primary transition-all duration-300 ease-in-out rounded-lg hover:bg-primaryLight dark:hover:bg-primaryLight text-white dark:text-primaryDark disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
