import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import NavMenu from "../NavMenu/NavMenu";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function handleNavMenu() {
    setIsMenuOpen(false);
  }
  return (
    <>
      <div className="sticky top-0 z-50">
        <nav className="flex justify-between items-center px-5 md:px-7 py-6 md:py-6 border-b border-gray-200 bg-white dark:bg-[#0D0D0D] dark:text-white">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <RiMenu2Fill />
          </div>
          <div className="text-xl md:text-2xl font-bold">GIFT GINNIE</div>
          <div className="flex gap-4 md:gap-6 ">
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
