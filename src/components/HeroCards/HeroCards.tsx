import { useQuery } from "@tanstack/react-query";
import { getPopularCategories } from "../../api/api";
import FixedHeroCards from "./FixedHeroCards";

import NotFixedHeroCards from "./NotFixedHeroCards";

export default function HeroCards() {
  const {
    data: popularcatogories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularcatogories"],
    queryFn: async () => getPopularCategories(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (popularcatogories) {
    if (popularcatogories?.data?.length === 5) {
      return <FixedHeroCards imagesData={popularcatogories.data} />;
    } else {
      return <NotFixedHeroCards popularcatogories={popularcatogories} />;
    }
  }
}
