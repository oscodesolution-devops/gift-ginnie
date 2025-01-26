import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getPopularProducts } from "../../api/api";
import { useAuth } from "../../context/Auth";
import HomeHeading from "../HomeHeading/HomeHeading";
import SlidingCards from "../SlidingCards/SlidingCards";
import { TPopularProductItem } from "../../types/Types";
import SlidingCards2 from "../SlidingCards/SlidingCards2";

type TPopularProductCategory = {
  id: number;
  name: string;
  description: string;
  category: number;
  images: TPopularProductItem[];
  is_liked: boolean;
};

export default function Trending() {
  const { accessToken, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularProducts", token],
    queryFn: async () => getPopularProducts(token as string),
    enabled: !!token,
  });

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [token, accessToken]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full mt-20">
      <HomeHeading heading={"Trending Now"} />
      {isAuthenticated ? (
        <div>
          {popularProducts?.data?.map((product: TPopularProductCategory) => (
            <>
              <div
                className="font-bold pt-6 text-xl w-full flex justify-center"
                key={product.id}
              >
                {product.name}
              </div>
              <SlidingCards2 card={product.images} />
            </>
          ))}
        </div>
      ) : (
        <>
          <SlidingCards />
          <SlidingCards />
        </>
      )}
    </div>
  );
}
