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
