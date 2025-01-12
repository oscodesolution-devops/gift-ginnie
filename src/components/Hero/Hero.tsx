import { name } from "../../constants";
import ImageGallery from "../SlidingImages/SlidingImages";

export default function Hero() {
  return (
    <div className="w-full py-12 dark:text-white/70">
      <div className="w-full text-center uppercase text-sm mb-4">
        Welcome to
      </div>
      <div className="w-full text-center uppercase font-bold text-3xl px-4 sm:text-4xl mb-14">
        {name}
      </div>
      <ImageGallery />
    </div>
  );
}
