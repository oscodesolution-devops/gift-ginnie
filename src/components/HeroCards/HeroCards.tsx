import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularCategories } from "../../api/api";
import { useAuth } from "../../context/Auth";
import DefaultHeroCards from "./DefaultHeroCards";
import FixedHeroCards from "./FixedHeroCards";

import NotFixedHeroCards from "./NotFixedHeroCards";

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

  if (isAuthenticated) {
    return popularcatogories?.data.length === 5 ? (
      <FixedHeroCards imagesData={popularcatogories?.data} />
    ) : (
      <NotFixedHeroCards popularcatogories={popularcatogories} />
    );
  } else {
    return <DefaultHeroCards />;
  }
}
