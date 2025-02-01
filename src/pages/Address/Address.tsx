import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/Auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addAddress, getUserProfile } from "../../api/api";
import { TAddress } from "../Profile/Profile";

export interface AddressForm {
  address_line_1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  address_type: "H" | "B";
}

interface FormErrors {
  address_line_1?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  address_type?: string;
}

export default function AddressForm() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState<AddressForm>({
    address_line_1: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    address_type: "H",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (data: AddressForm) => addAddress(data, accessToken as string),
    onSuccess: (data) => {
      toast.success("Address added successfully!");
      setFormData({
        address_line_1: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        address_type: "H",
      });

      setErrors({});
      console.log(data);

      navigate("/order", { state: { address_id: data.data.id } });
    },
    onError: (error: any) => {
      if (error && typeof error === "object") {
        // Handle field-specific errors
        const fieldErrors: FormErrors = {};
        Object.entries(error).forEach(([key, value]) => {
          if (key in formData) {
            fieldErrors[key as keyof FormErrors] = Array.isArray(value)
              ? value[0]
              : String(value);
          }
        });
        setErrors(fieldErrors);
        toast.error("Please correct the errors in the form");
      } else {
        toast.error("Failed to add address. Please try again.");
      }
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address_line_1.trim()) {
      newErrors.address_line_1 = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-primary dark:bg-primaryDark  text-black dark:text-white">
        <Address />
        <div className="w-full max-w-md space-y-8 dark:border-2 dark:border-primary  p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight ">
              Add New Address
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email
                </label>
                <input
                  id="address_line_1"
                  name="address_line_1"
                  type="text"
                  value={formData.address_line_1}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address_line_1: e.target.value,
                    });
                    setErrors({ ...errors, address_line_1: undefined });
                  }}
                  className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    errors.address_line_1 ? "ring-red-500" : "ring-gray-300"
                  }  focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6  dark:text-black dark:ring-gray-600`}
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.address_line_1}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium ">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      setErrors({ ...errors, city: undefined });
                    }}
                    className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.city ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6  dark:text-black dark:ring-gray-600`}
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium ">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => {
                      setFormData({ ...formData, state: e.target.value });
                      setErrors({ ...errors, state: undefined });
                    }}
                    className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.state ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value });
                      setErrors({ ...errors, country: undefined });
                    }}
                    className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.country ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.country}</p>
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => {
                      setFormData({ ...formData, pincode: e.target.value });
                      setErrors({ ...errors, pincode: undefined });
                    }}
                    className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.pincode ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="address_type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Address Type
                </label>
                <select
                  id="address_type"
                  name="address_type"
                  value={formData.address_type}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address_type: e.target.value as "H" | "B",
                    });
                    setErrors({ ...errors, address_type: undefined });
                  }}
                  className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    errors.address_type ? "ring-red-500" : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                >
                  <option value="H">Home</option>
                  <option value="B">Business</option>
                </select>
                <p className="text-xs text-red-500 mt-1">
                  {errors.address_type}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="group relative flex w-full justify-center rounded-md bg-primaryDark dark:bg-primary dark:text-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-grey-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {mutation.isPending ? "Adding..." : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const Address = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<number>(-1);
  const { accessToken } = useAuth();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(accessToken as string),
    enabled: !!accessToken,
  });

  if (isLoading) return;
  <div className="mb-10">
    <div className="w-full text-4xl text-center my-5 font-bold">
      <div className="h-8 w-2/3 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-primaryDark dark:border-2 dark:border-white dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>;

  if (isError) return <div>{error.message}</div>;

  const address: TAddress[] = userData?.data?.addresses;

  return (
    <div>
      {address.length > 0 && (
        <div className="mb-10">
          <div className="w-full text-4xl text-center my-5 font-bold">
            Select from available addresses
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {address.map((add: TAddress) => (
              <div
                key={add.id}
                onClick={() => {
                  setSelectedAddress(add.id);
                }}
                className={`bg-white dark:bg-primaryDark dark:border-2 cursor-pointer dark:border-white dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                  selectedAddress === add.id
                    ? "ring-2 ring-black dark:bg-white"
                    : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold bg-gray-100 dark:text-black rounded`}
                    >
                      {add.address_type === "H" ? "Home" : "Business"}
                    </span>
                  </div>
                  <div
                    className={`space-y-1 text-sm ${
                      selectedAddress === add.id ? " dark:text-black" : ""
                    }`}
                  >
                    <p className="font-medium">{add?.address_line_1}</p>
                    {add?.address_line_2 && <p>{add?.address_line_2}</p>}
                    <p>
                      {add?.city}, {add?.state}
                    </p>
                    <p>
                      {add?.country.toUpperCase()}, {add?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center w-full">
            <button
              onClick={() => {
                navigate("/order", { state: { address_id: selectedAddress } });
              }}
              className={`bg-black dark:bg-white dark:text-black text-white text-center  py-2 px-4 rounded-lg mt-4 ${
                selectedAddress === -1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={selectedAddress === -1}
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
