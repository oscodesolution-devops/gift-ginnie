import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import NavMenu from "../NavMenu/NavMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  function handleNavMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <nav className="flex justify-between items-center px-6 md:px-7 py-6 md:py-6 border-b border-black/5 bg-primary dark:bg-primaryDark dark:text-white">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <RiMenu2Fill />
          </div>
          <div className="text-xl md:text-2xl font-bold">GIFT GINNIE</div>
          <div className="flex gap-4 md:gap-6">
            <ThemeToggle />
            <div className="text-2xl cursor-pointer">
              <IoIosSearch />
            </div>
          </div>
        </nav>
        {isMenuOpen && <NavMenu handleNavMenu={handleNavMenu} />}
      </div>
    </>
  );
}
