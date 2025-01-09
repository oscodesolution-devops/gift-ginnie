import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const navItems: { name: string; list: string[] }[] = [
  {
    name: "Home",
    list: [],
  },
  {
    name: "product",
    list: ["Advisiable", "Best Sellers", "New Arrivals", "On Sale"],
  },
  {
    name: "short-by",
    list: ["views", "price", "rating"],
  },
  {
    name: "blog",
    list: [],
  },
  {
    name: "faq",
    list: [],
  },
  {
    name: "contact",
    list: [],
  },
];

export default function NavMenu({
  handleNavMenu,
}: {
  handleNavMenu: () => void;
}) {
  // State to track the opened list item
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Toggle function to handle open/close of the list
  const handleToggle = (itemName: string) => {
    setOpenItem(openItem === itemName ? null : itemName);
  };

  return (
    <div className="absolute top-0 left-0 w-full md:w-1/4 h-screen bg-white dark:bg-[#3d3c3c] dark:text-white">
      {/* Main Menu Container */}
      <div className="w-full text-2xl lg:text-2xl font-bold bg-white text-black dark:bg-[#3d3c3c] dark:text-white">
        {/* Header */}
        <div
          style={{ borderBottom: ".1px solid gray" }}
          className="flex justify-between items-center px-8 py-7"
        >
          <div>MENU</div>
          <div onClick={handleNavMenu} className="cursor-pointer">
            <IoMdClose />
          </div>
        </div>

        {/* Menu List */}
        <div className="text-xl lg:text-xl font-semibold px-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="border-b py-6 uppercase"
              style={{ borderBottom: ".1px solid gray" }}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleToggle(item.name)}
              >
                <div>{item.name}</div>
                {item.list.length > 0 && (
                  <div className="cursor-pointer">
                    {openItem === item.name ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                )}
              </div>

              {/* Conditional rendering of the sublist */}
              {openItem === item.name && item.list.length > 0 && (
                <div>
                  {item.list.map((list, index) => (
                    <div
                      key={list}
                      style={{
                        borderBottom:
                          index === item.list.length - 1
                            ? "none"
                            : ".1px solid gray",
                      }}
                      className="py-5 text-xs lg:text-xs px-10"
                    >
                      {list}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
