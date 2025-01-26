import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularCategories } from "../../api/api";
import { useAuth } from "../../context/Auth";
import DefaultHeroCards from "./DefaultHeroCards";
import FixedHeroCards from "./FixedHeroCards";
import HomeHeading from "../HomeHeading/HomeHeading";
import { TPopularCategories } from "../../types/Types";

export default function HeroCards() {
  const { accessToken, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  const {
    data: popularcatogories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularcatogories", token],
    queryFn: async () => getPopularCategories(token as string),
    enabled: !!token,
  });

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [accessToken]); // Only depend on accessToken, not token itself

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("catogories", popularcatogories?.data);

  if (isAuthenticated) {
    return popularcatogories?.data.length === 5 ? (
      <FixedHeroCards imagesData={popularcatogories?.data} />
    ) : (
      <div>
        <div>
          <HomeHeading heading={"Elevating Your Style Game"} />
          <div className="w-full text-center uppercase text-sm px-20 dark:text-white/70">
            Discover the Perfect Blend of Comfort and Trend with Our Exclusive
            Collection. Explore Deals on Jeans, Sneakers, and More!
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-20  py-12 flex justify-center flex-wrap gap-6 items-stretch">
          {popularcatogories?.data.map((item: TPopularCategories) => (
            <div
              key={item.category_id}
              className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg border-2 p-6 `}
            >
              <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">
                {item.category_name}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
                {item.category_description}
              </p>
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={`${item.image}`}
                  alt={item.category_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <DefaultHeroCards />;
  }
}
