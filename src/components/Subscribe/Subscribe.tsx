import { motion } from "framer-motion";

export default function Subscribe() {
  return (
    <div className="relative w-full h-[90%] overflow-hidden">
      {/* Scrolling Images */}
      <motion.div
        className="flex h-[90vh]"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 30, // Adjust the speed
          ease: "linear",
        }}
      >
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
        <img
          src="https://framerusercontent.com/images/d20Z0EMhlfZPRfWYcdIKfVAUpU.png"
          alt="Infinite scroll"
          className="w-auto h-full pb-20 pt-32"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className="absolute z-20 inset-0 bg-gradient-to-r from-primary dark:from-black via-transparent dark:via-transparent to-primary dark:to-black pointer-events-none"
        style={{
          mixBlendMode: "lighten",
          backgroundSize: "500% 100%",
        }}
      ></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center md:px-28 lg:mx-48">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 text-center">
          DISCOVER STYLE JUST A BUTTON PRESS AWAY!
        </h1>
        <div className="mt-4 flex flex-col gap-4 w-full px-5 ">
          <input
            type="email"
            placeholder="Your email address"
            className="px-2 py-2 sm:py-3 border rounded-l-md bg-gray-200 text-black dark:text-white text-center"
          />
          <button className="px-6 py-3 sm:py-4 bg-gray-800 dark:bg-[#1A1A1A] text-white dark:text-gray-100 rounded-r-md">
            Subscribe
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm sm:text-lg sm:font-semibold text-center uppercase">
          Instantly access the latest fashion trends and exclusive deals on our
          site. Discover your perfect style in a few clicks!
        </p>
      </div>
    </div>
  );
}
