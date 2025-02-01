import { useNavigate } from "react-router-dom";
import { TPopularCategories } from "../../types/Types";
import HomeHeading from "../HomeHeading/HomeHeading";
import { useTheme } from "./DefaultHeroCards";

// Custom hook for theme management

export default function FixedHeroCards({
  imagesData,
}: {
  imagesData: TPopularCategories[];
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <HomeHeading heading={"Elevating Your Style Game"} />
        <div className="w-full text-center uppercase text-sm px-20 dark:text-white/70">
          Discover the Perfect Blend of Comfort and Trend with Our Exclusive
          Collection. Explore Deals on Jeans, Sneakers, and More!
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-20  py-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col h-full">
          <div
            onClick={() =>
              navigate(`/products`, {
                state: { category_id: imagesData[0].category_id },
              })
            }
            className={`flex cursor-pointer flex-col justify-between bg-white border-2 rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">
              {imagesData[0].category_name}
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
              {imagesData[0].category_description}
            </p>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={`${imagesData[0].image}`}
                alt={imagesData[0].category_name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            onClick={() =>
              navigate(`/products`, {
                state: { category_id: imagesData[1].category_id },
              })
            }
            className={`flex flex-col cursor-pointer justify-between bg-white rounded-lg border-2 p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">
              {imagesData[1].category_name}
            </h2>
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={`${imagesData[1].image}`}
                alt={`${imagesData[1].category_name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div
          onClick={() =>
            navigate(`/products`, {
              state: { category_id: imagesData[2].category_id },
            })
          }
          className={`flex border-2 flex-col cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
            theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
          }`}
        >
          <div className="aspect-[4/3] overflow-hidden mb-6">
            <img
              src={`${imagesData[2].image}`}
              alt="Promotions header"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">
            {imagesData[2].category_name}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
            {imagesData[2].category_description}
          </p>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={`${imagesData[2].image}`}
              alt={imagesData[2].category_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col h-full">
          <div
            onClick={() =>
              navigate(`/products`, {
                state: { category_id: imagesData[3].category_id },
              })
            }
            className={`flex flex-col border-2 cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90">
              {imagesData[3].category_name}
            </h2>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={`${imagesData[3].image}`}
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            onClick={() =>
              navigate(`/products`, {
                state: { category_id: imagesData[4].category_id },
              })
            }
            className={`flex flex-col border-2 cursor-pointer justify-between bg-white rounded-lg p-6 h-full ${
              theme === "light" ? "card-gradient" : "dark:bg-[#1e1e1e]"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 dark:text-white/90 ">
              {imagesData[4].category_name}
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6 dark:text-white/70">
              {imagesData[4].category_description}
            </p>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={`${imagesData[4].image}`}
                alt={imagesData[4].category_name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
