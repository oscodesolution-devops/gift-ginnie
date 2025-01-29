import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserProfile, updateProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { TUserProfile } from "../Profile/Profile";

export interface ProfileForm {
  email: string;
  full_name: string;
  phone_number: string;
  country_code: string;
  is_active: boolean;
  is_wholesale_customer: boolean;
  gender: "M" | "F" | "O";
}

interface FormErrors {
  email?: string;
  full_name?: string;
  phone_number?: string;
  country_code?: string;
  gender?: string;
}

export default function ProfileForm() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileForm>({
    email: "",
    full_name: "",
    phone_number: "",
    country_code: "IN",
    is_active: true,
    is_wholesale_customer: true,
    gender: "M",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (data: ProfileForm) => {
      return updateProfile(data, accessToken as string);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.data.email[0] ||
          "Failed to update profile. Please try again."
      );
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(accessToken as string),
    enabled: !!accessToken,
  });
  const user = userData?.data as TUserProfile;

  useEffect(() => {
    if (user?.id) {
      setFormData({
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        country_code: user.country_code,
        is_active: user.is_active,
        is_wholesale_customer: user.is_wholesale_customer,
        // @ts-ignore
        gender: user.gender,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-primary dark:bg-primaryDark text-black dark:text-white">
      <div className="w-full max-w-md space-y-8 dark:border-2 dark:border-primary p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {user?.id ? "Update Profile" : "Create Profile"}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: undefined });
                }}
                className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                  errors.email ? "ring-red-500" : "ring-gray-300"
                } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
              />
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => {
                  setFormData({ ...formData, full_name: e.target.value });
                  setErrors({ ...errors, full_name: undefined });
                }}
                className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                  errors.full_name ? "ring-red-500" : "ring-gray-300"
                } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
              />
              <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium"
                >
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={formData.phone_number}
                  onChange={(e) => {
                    setFormData({ ...formData, phone_number: e.target.value });
                    setErrors({ ...errors, phone_number: undefined });
                  }}
                  className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    errors.phone_number ? "ring-red-500" : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone_number}
                </p>
              </div>

              <div>
                <label
                  htmlFor="country_code"
                  className="block text-sm font-medium"
                >
                  Country Code
                </label>
                <input
                  id="country_code"
                  name="country_code"
                  type="text"
                  value={formData.country_code}
                  onChange={(e) => {
                    setFormData({ ...formData, country_code: e.target.value });
                    setErrors({ ...errors, country_code: undefined });
                  }}
                  className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    errors.country_code ? "ring-red-500" : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
                />
                <p className="text-xs text-red-500 mt-1">
                  {errors.country_code}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    gender: e.target.value as "M" | "F" | "O",
                  });
                  setErrors({ ...errors, gender: undefined });
                }}
                className={`relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                  errors.gender ? "ring-red-500" : "ring-gray-300"
                } focus:ring-2 focus:ring-inset focus:ring-primaryDark dark:focus:ring-primary sm:text-sm sm:leading-6 dark:text-black dark:ring-gray-600`}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative flex w-full justify-center rounded-md bg-primaryDark dark:bg-primary dark:text-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:bg-grey-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {mutation.isPending ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
