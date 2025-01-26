import axios from "axios";

const BASE_URL = "http://18.218.49.219:8000";

export const sendOTP = async (phoneNumber: string, countryCode: string) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/api/v1/users/auth/sendOTP/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      phone_number: phoneNumber,
      country_code: countryCode,
    },
  };

  const response = await axios.request(config);
  return response.data;
};

export const verifyOTP = async (
  phoneNumber: string,
  countryCode: string,
  otp: string,
  token: string,
  verificationId: string
) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/api/v1/users/auth/verifyOTP/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      phone_number: phoneNumber,
      country_code: countryCode,
      otp: otp,
      token: token,
      verification_id: verificationId,
    },
  };

  const response = await axios.request(config);
  return response.data;
};

export const getCarouselImages = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/carausel-items/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getPopularCategories = async (token: string) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/popular-categories/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getPopularProducts = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/products/popular-products/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
