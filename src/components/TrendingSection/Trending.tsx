import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "../../api/api";
import HomeHeading from "../HomeHeading/HomeHeading";
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
  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularProducts"],
    queryFn: async () => getPopularProducts(),
    // enabled: !!token,
  });



  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full mt-20">
      <HomeHeading heading={"Trending Now"} />
      {popularProducts && (
        <div>
          {popularProducts?.data?.map((product: TPopularProductCategory) => (
            <>
              <div
                className="font-bold pt-6 text-xl w-full flex justify-center"
                key={product.id}
              >
                {product.name}
              </div>
              <SlidingCards2
                card={product.images}
                key={product.id}
                navigationId={product.id}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
}
