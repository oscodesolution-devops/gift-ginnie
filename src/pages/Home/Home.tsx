import Hero from "../../components/Hero/Hero";
import HeroCards from "../../components/HeroCards/HeroCards";
import MainVideo from "../../components/MainVideo/MainVideo";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <MainVideo />
      <Hero />
      <HeroCards />
    </div>
  );
}
