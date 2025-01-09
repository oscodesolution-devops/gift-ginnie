import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-5 py-6 border-b border-gray-200 bg-white dark:bg-black dark:text-white">
      <div className="text-2xl">
        <RiMenu2Fill />
      </div>
      <div className="text-xl font-bold">GIFT GINNIE</div>
      <div className="flex gap-4">
        <ThemeToggle />
        <div className="text-2xl">
          <IoIosSearch />
        </div>
      </div>
    </nav>
  );
}
