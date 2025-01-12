import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import NavMenu from "../NavMenu/NavMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInVideoSection, setIsInVideoSection] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Disable body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Handle scroll and video section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);

      // Get video section height
      const videoSection = document.querySelector(".video-section");

      if (videoSection) {
        const videoHeight = videoSection.getBoundingClientRect().height;
        setIsInVideoSection(currentPosition <= videoHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-transform duration-300 `}
    >
      <nav
        className={`flex absolute w-full justify-between items-center px-6 md:px-7 py-6 md:py-6 border-b border-black/5 ${
          isInVideoSection ? "bg-transparent" : "bg-primary"
        } dark:bg-primaryDark dark:text-white`}
      >
        <div
          className="text-2xl cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <RiMenu2Fill />
        </div>
        <div
          className={`text-xl md:text-2xl font-bold ${
            isInVideoSection ? "hidden" : ""
          }`}
        >
          GIFT GINNIE
        </div>
        <div className="flex gap-4 md:gap-6">
          <ThemeToggle />
          <div className="text-2xl cursor-pointer">
            <IoIosSearch />
          </div>
        </div>
      </nav>
      {isMenuOpen && <NavMenu handleNavMenu={handleNavMenu} />}
    </div>
  );
}
