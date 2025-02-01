import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Subscribe from "../../components/Subscribe/Subscribe";
import { TProduct } from "../../types/Types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../api/api";
import ProductSkeleton from "./ProductLoading";
import { useAuth } from "../../context/Auth";

export default function Advisiable() {
  const { accessToken } = useAuth();
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => getAllProduct(accessToken as string),
  });

  console.log(allProducts);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-6 py-16  md:py-20 dark:text-white w-full">
        <Breadcrumbs />
        <div className="flex flex-col gap-8  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allProducts?.data.map((card: TProduct) => (
            <ProductCard card={card} />
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
}
