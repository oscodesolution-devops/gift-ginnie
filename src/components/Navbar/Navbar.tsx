import { useState, useEffect } from "react";
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
  const [isCountAnimating, setIsCountAnimating] = useState(false);

  // state for user icon
  const [isUserIconOpen, setIsUserIconOpen] = useState(false);

  const { checkAuth, logout } = useAuth();

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

  // Animate cart count when it changes
  useEffect(() => {
    if (cartItemsCount !== initialCartCount) {
      setIsCountAnimating(true);
      const timer = setTimeout(() => setIsCountAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemsCount, initialCartCount]);

  function handleNavMenu() {
    setIsMenuOpen(false);
  }

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
              {" "}
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
          <div className="text-2xl cursor-pointer relative">
            <FaRegCircleUser
              onClick={() => setIsUserIconOpen(!isUserIconOpen)}
            />
            {isUserIconOpen && (
              <div className="absolute top-8 -right-2 bg-primary dark:border-2 dark:border-white dark:bg-primaryDark text-primaryBlack dark:text-primary shadow-lg  text-sm px-4 py-1 rounded flex flex-col gap-1">
                {/* todo fix the profile sreen url */}

                {checkAuth() ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/");
                        setIsUserIconOpen(false);
                      }}
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserIconOpen(false);
                      }}
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
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {isMenuOpen && <NavMenu handleNavMenu={handleNavMenu} />}
    </div>
  );
}
