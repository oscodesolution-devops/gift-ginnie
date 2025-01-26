import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OTPInput = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authToken, verificationId, phoneNumber, countryCode } =
    location.state || {};

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verifyMutation = useMutation({
    mutationFn: () =>
      verifyOTP(
        phoneNumber,
        countryCode,
        otp.join(""),
        authToken,
        verificationId
      ),
    onSuccess: (data) => {
      toast.success("OTP verified successfully");
      setError(null);

      //   set data in local storage
      localStorage.setItem("authToken", data.data.access);
      localStorage.setItem("refreshToken", data.data.refresh);
      localStorage.setItem("verificationId", verificationId);

      navigate("/");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Verification failed");
      toast.error("Verification failed");
    },
  });

  React.useEffect(() => {
    if (!authToken || !verificationId || !phoneNumber || !countryCode) {
      navigate("/");
    }
  }, [authToken, verificationId, phoneNumber, countryCode, navigate]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, 6);

    const pastedOTP = pastedText
      .split("")
      .map((char) => (isNaN(Number(char)) ? "" : char));

    setOtp(pastedOTP);
    inputRefs.current[pastedOTP.length - 1]?.focus();
  };

  const handleVerify = () => {
    if (otp.join("").length === 6) {
      verifyMutation.mutate();
    } else {
      setError("Please enter complete OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-primaryDark p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md dark:bg-black dark:border-white dark:border-2">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to {phoneNumber}
        </p>
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-10 text-center border rounded-lg text-xl"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={verifyMutation.isPending}
            className="w-full p-3 dark:bg-primary bg-primaryDark text-white dark:text-black rounded-lg 
              disabled:opacity-50  transition-colors"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
