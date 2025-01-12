import { useState, useEffect } from "react";

// Custom hook for theme management
const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    };

    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(currentTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    const observer = new MutationObserver(handleThemeChange);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    handleThemeChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return theme;
};
export default function HeroCards() {
  const theme = useTheme();

  return (
    <div>
      <div>
        <div className="w-full text-center uppercase font-bold text-3xl px-4 sm:text-4xl mb-4 dark:text-white">
          Elevating Your Style Game
        </div>
        <div className="w-full text-center uppercase text-sm px-20 dark:text-white/70">
          Discover the Perfect Blend of Comfort and Trend with Our Exclusive
          Collection. Explore Deals on Jeans, Sneakers, and More!
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-20  py-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col h-full">
          <div
            className={`flex cursor-pointer flex-col justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">DIARY</h2>
            <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
              Style and comfort meet in our collection of jeans. Discover the
              latest trends and perfect cuts for an impeccable look.
            </p>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://framerusercontent.com/images/hUxmIvwxcK4ooUIOpq6gq714LQ.jpg?scale-down-to=512"
                alt="Diary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">CHOCOLATES</h2>
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://framerusercontent.com/images/6c9sH3EbYku4CzpysCAihW3eX4.jpg?scale-down-to=512"
                alt="Chocolates"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div
          className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
            theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
          }`}
        >
          <div className="aspect-[4/3] overflow-hidden mb-6">
            <img
              src="https://framerusercontent.com/images/jBfVmSn1gNxYnEJ5o6xUf9AdDg.jpg?scale-down-to=512"
              alt="Promotions header"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">PROMOTIONS</h2>
          <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
            Explore exclusive deals on our top products. The perfect opportunity
            to enrich your wardrobe with trendy pieces at affordable prices.
          </p>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="https://framerusercontent.com/images/K9E6YQI58nuZu2gxJ0Ipr8KMMYI.jpg?scale-down-to=512"
              alt="Promotions footer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col h-full">
          <div
            className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">HEADPHONES</h2>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://framerusercontent.com/images/MSCMQyOWQbMvFKbwlgcAvJhuxLo.jpg?scale-down-to=512"
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90 ">PERFUMES</h2>
            <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
              Passion for fashion and comfort is reflected in every pair of
              sneakers. Experience style and functionality in a single step.
            </p>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://framerusercontent.com/images/DS6GzA3xzdHI15AWWCJofUOU.jpg?scale-down-to=1024"
                alt="Perfumes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
