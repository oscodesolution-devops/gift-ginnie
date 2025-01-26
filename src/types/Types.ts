export interface CardProps {
  image: string;
  stock: string;
  title: string;
  discount: string;
  price: string;
  originalPrice: string;
  styles: string;
}

export type TPopularCategories = {
  category_id: number;
  category_name: string;
  average_rating: number;
  total_reviews: number;
  image: string;
  category_description: string;
};

export type TPopularProductItem = {
  id: number;
  image: string;
  product: number;
};

export type TProduct = {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  images: {
    id: number;
    image: string;
    product: number;
  }[];
  in_stock: boolean;
  rating: number;
  original_price: string;
  selling_price: string;
  brand: string;
  product_type: string;
  is_liked: boolean;
};
