import axios from "axios";
import { AddressForm } from "../pages/Address/Address";
import { ProfileForm } from "../pages/ProfileUpdate/ProfileUpdate";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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

export const getCarouselImages = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/carausel-items/`,
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getPopularCategories = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/popular-categories/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getPopularProducts = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/popular-products/`,
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getProduct = async (token: string, id: number) => {
  const response = await axios.get(`${BASE_URL}/api/v1/products/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getAllProduct = async (token: string) => {
  if (token === null) {
    const response = await axios.get(`${BASE_URL}/api/v1/products/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } else {
    const response = await axios.get(`${BASE_URL}/api/v1/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
};
export const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/products/categories/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getCatProducts = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/products/categories/${id}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getReviews = async (token: string, id: number) => {
  const response = await axios.get(`${BASE_URL}/api/v1/product/${id}/rating/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getCartProducts = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getLikeItems = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/products/favourite/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const addLikeItem = async (token: string, id: number) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/products/favourite/`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const checkout = async (token: string, address_id: number) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/orders/checkout/`,
    { address_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const verifyPayment = async (
  accessToken: string,
  paymentData: PaymentResponse
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/orders/verifyPayment/`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-CSRFTOKEN":
            "fISM01fR0nL2H0oxpT5KM3HxVmOxw87axxbyAGNgoG6K15C5ZiSdYxlKNLNBKzx6",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Payment verification failed"
    );
  }
};

export const getUserProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/users/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addAddress = async (data: AddressForm, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/users/profile/address/`,
    data,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateProfile = async (data: ProfileForm, token: string) => {
  console.log(data);
  const response = await axios.patch(
    `${BASE_URL}/api/v1/users/profile/update/`,
    data,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const deleteAddress = async (id: number, token: string) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/users/profile/address/`,
    {
      data: { id },
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getOrders = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/orders/checkout/`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getCoupons = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/v1/coupon/`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const applyCoupon = async (token: string, code: string) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/cart/applyCoupon/`,
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
  return response.data;
};
export const removeCoupon = async (token: string) => {
  const response = await axios.delete(`${BASE_URL}/api/v1/cart/applyCoupon/`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postRating = async (
  token: string,
  productId: number,
  rating: number,
  review: string
) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/product/${productId}/rating/`,
    {
      rating: rating,
      review: review,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
