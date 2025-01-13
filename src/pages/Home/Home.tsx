import Hero from "../../components/Hero/Hero";
import HeroCards from "../../components/HeroCards/HeroCards";
import MainVideo from "../../components/MainVideo/MainVideo";
import Subscribe from "../../components/Subscribe/Subscribe";
import Trending from "../../components/TrendingSection/Trending";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <MainVideo />
      <Hero />
      <HeroCards />
      <Trending />
      <Subscribe />
    </div>
  );
}
