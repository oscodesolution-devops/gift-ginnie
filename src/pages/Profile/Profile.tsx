import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendar,
} from "react-icons/fa";
import { deleteAddress, getUserProfile } from "../../api/api";
import { useAuth } from "../../context/Auth";
import ProfileSkeleton from "./ProfileSkeleton";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

type TAddress = {
  id: number;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  country: string;
  pincode: string;
  address_type: string;
};

export type TUserProfile = {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
  country_code: string;
  is_active: boolean;
  profile_image: string | null;
  is_wholesale_customer: boolean;
  gender: string;
  date_joined: string;
  addresses: TAddress[];
};

const UserProfile = () => {
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
  const user = userData?.data as TUserProfile;

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 mt-20 md:px-40">
      <div className="space-y-6">
        {/* User Info Card */}
        <div className="bg-white dark:bg-primaryDark dark:border-2 dark:border-white dark:text-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 p-6">
            <div className="flex relative items-center space-x-4">
              <div className="h-16 w-16  rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="h-8 w-8 text-gray-600" />
              </div>
              <Link to="/update-profile">
                {" "}
                <button className="bg-black absolute right-0 text-white px-2 py-1 rounded dark:bg-white dark:text-black">
                  Update
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{user?.full_name}</h1>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user?.is_active ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span>{user?.is_active ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 p-6">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="h-5 w-5 text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="h-5 w-5 text-gray-500" />
              <span>
                ({user?.country_code}) {user?.phone_number}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendar className="h-5 w-5 text-gray-500" />
              <span>Joined {formatDate(user?.date_joined)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
              <span>{user?.addresses?.length} Addresses</span>
            </div>
          </div>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.addresses?.map((address: TAddress) => (
            <Address key={address.id} {...address} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

const Address = (address: TAddress) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteAddress(address.id, accessToken as string),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["userProfile"] });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(["userProfile"]);

      // Optimistically update the profile by removing the address
      queryClient.setQueryData(["userProfile"], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          addresses: old.data.addresses.filter(
            (addr: TAddress) => addr.id !== address.id
          ),
        },
      }));

      // Return the snapshot for rollback
      return { previousProfile };
    },
    onError: ( error) => {
      
      toast.error(error.message || "Failed to delete address. Please try again.");
    },
    onSuccess: () => {
      toast.success("Address deleted successfully!");
      // Refetch to ensure sync with server
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return (
    <div className="bg-white dark:bg-primaryDark dark:border-2 dark:border-white dark:text-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 dark:text-black rounded">
            {address?.address_type === "H" ? "Home" : "Business"}
          </span>
          <span
            onClick={() => mutation.mutate()}
            className="text-xl cursor-pointer text-red-500 hover:text-red-700 transition-colors"
          >
            <MdDelete />
          </span>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-medium">{address?.address_line_1}</p>
          {address?.address_line_2 && <p>{address?.address_line_2}</p>}
          <p>
            {address?.city}, {address?.state}
          </p>
          <p>
            {address?.country.toUpperCase()}, {address?.pincode}
          </p>
        </div>
      </div>
    </div>
  );
};
