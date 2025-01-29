import React, { useState, useEffect, useRef } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import NavMenu from "../NavMenu/NavMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useVideoContext } from "../../context/MainVideo";
import { name } from "../../constants";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/AddToCart";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../../context/Auth";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItemsCount, cartLoading, initialCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isInVideoSection } = useVideoContext();
  const [isCountAnimating] = useState(false);

  // State for user menu
  const [isUserIconOpen, setIsUserIconOpen] = useState(false);
  const userMenuRef = useRef(null);

  const { checkAuth, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent) {
      // @ts-ignore
      if (userMenuRef.current && !userMenuRef?.current?.contains(event.target)) {
        setIsUserIconOpen(false);
      }
    }
    // @ts-ignore
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed w-full top-0 z-50 transition-transform duration-300">
      <nav
        className={`${
          isInVideoSection
            ? "bg-transparent dark:bg-transparent"
            : "bg-primary dark:bg-primaryDark"
        } flex justify-between items-center px-6 md:px-7 py-6 md:py-6 border-b border-black/5 bg-primary dark:bg-primaryDark dark:text-white`}
      >
        <div
          className="text-2xl cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <RiMenu2Fill />
        </div>
        <div
          className={`text-xl md:text-2xl hidden font-bold ${
            isInVideoSection ? "hidden" : "sm:block"
          }`}
        >
          {name}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart className="text-xl" />
            </Link>
            {cartLoading ? (
              <div className="text-xs absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-4 h-4 flex justify-center items-center animate-pulse">
                ...
              </div>
            ) : cartItemsCount > 0 ? (
              <div
                className={`text-xs absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center
                  ${isCountAnimating ? "animate-bounce" : ""}
                  ${cartItemsCount > initialCartCount ? "scale-110" : ""}
                  transition-all duration-300`}
              >
                {cartItemsCount}
              </div>
            ) : null}
          </div>

          <div className="text-2xl cursor-pointer">
            <ThemeToggle />
          </div>

          {/* User Profile Menu */}
          <div
            className="relative"
            ref={userMenuRef}
            onMouseEnter={() => setIsUserIconOpen(true)}
            onMouseLeave={() => setIsUserIconOpen(false)}
          >
            <FaRegCircleUser className="text-2xl cursor-pointer" />
            {isUserIconOpen && (
              <div className="absolute top-6 -right-2 bg-primary dark:border-2 dark:border-white dark:bg-primaryDark text-primaryBlack dark:text-primary shadow-lg text-sm px-4 py-2 rounded flex flex-col gap-1 w-28">
                {checkAuth() ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsUserIconOpen(false);
                      }}
                      className="text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setIsUserIconOpen(false);
                      }}
                      className="text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    >
                      Orders
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserIconOpen(false);
                        navigate("/login");
                      }}
                      className="text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsUserIconOpen(false);
                    }}
                    className="text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {isMenuOpen && <NavMenu handleNavMenu={() => setIsMenuOpen(false)} />}
    </div>
  );
}
