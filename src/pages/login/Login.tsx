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
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-primaryDark">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-xl bg-white dark:bg-black dark:border-white dark:border-2">
        <div>
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">
            Login
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="flex items-center gap-2 mb-4">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-24 p-2 border border-gray-300 rounded-lg"
            >
              <option value="91">+91 (India)</option>
              <option value="1">+1 (USA)</option>
              <option value="44">+44 (UK)</option>
              <option value="61">+61 (Australia)</option>
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-primaryDark dark:bg-primary hover:bg-primaryLight text-white dark:text-primaryDark rounded-lg"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
