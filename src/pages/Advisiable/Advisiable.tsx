import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Subscribe from "../../components/Subscribe/Subscribe";
import { TProduct } from "../../types/Types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllProduct, getCatProducts } from "../../api/api";
import ProductSkeleton from "./ProductLoading";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type TCategories = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function Advisiable() {
  const { accessToken } = useAuth();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  useEffect(() => {
    const { category_id } = location.state || {};
    console.log(category_id);
    setSelectedCategory(category_id || -1);
  }, [location]);

  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => getAllProduct(accessToken as string),
  });

  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => getAllCategories(),
  });

  const {
    data: catProducts,
    isLoading: catPLoading,
    error: catPError,
  } = useQuery({
    queryKey: ["catProducts", selectedCategory],
    queryFn: async () => {
      if (selectedCategory !== -1) {
        return getCatProducts(selectedCategory);
      }
      return allProducts?.data;
    },
    enabled: selectedCategory !== -1, // Prevent running the query if no category is selected
  });

  if (isLoading || categoriesLoading || catPLoading) {
    return <ProductSkeleton />;
  }

  if (error || categoriesError || catPError) {
    return (
      <div>
        Error:{" "}
        {error?.message || categoriesError?.message || catPError?.message}
      </div>
    );
  }

  const products = selectedCategory !== -1 ? catProducts : allProducts;

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-6 py-16 md:py-20 dark:text-white w-full">
        <div className="flex justify-end items-center mb-8">
          <select
            onChange={(e) => setSelectedCategory(+e.target.value)}
            value={selectedCategory}
            className="p-2 border rounded"
          >
            <option value={-1}>All Products</option>
            {allCategories?.data.map((category: TCategories) => (
              <option key={category.id} value={category.id}>
                {category.name}
                <img
                  className="w-10 h-10"
                  src={category.image}
                  alt={category.name}
                />
              </option>
            ))}
          </select>
        </div>

        {products?.data?.length === 0 && (
          <div className="w-full  h-[200px]  justify-between  flex flex-col items-center gap-4">
            <h1 className="text-4xl uppercase font-bold mb-6">
              No products found
            </h1>
          </div>
        )}
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.data?.map((card: TProduct) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
}
