import HomeHeading from "../HomeHeading/HomeHeading";
import SlidingCards from "../SlidingCards/SlidingCards";

export default function Trending() {
  return (
    <div className="w-full mt-20">
      <HomeHeading heading={"Trending Now"} />
      <SlidingCards />
      <SlidingCards />
    </div>
  );
}
