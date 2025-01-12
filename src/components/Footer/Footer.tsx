import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerSocialIcons = [
  {
    icons: <FaXTwitter className="w-full h-full text-gray-500" />,
  },
  {
    icons: <RiInstagramFill className="w-full h-full text-gray-500" />,
  },
  {
    icons: <FaPinterest className="w-full h-full text-gray-500" />,
  },
  {
    icons: <FaLinkedin className="w-full h-full text-gray-500" />,
  },
  {
    icons: <FaTiktok className="w-full h-full text-gray-500" />,
  },
  {
    icons: <FaYoutube className="w-full h-full text-gray-500" />,
  },
];

const footerTabs: { title: string; tabs: { name: string; link: string }[] }[] =
  [
    {
      title: "Product",
      tabs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Advisiable",
          link: "/",
        },
        {
          name: "Promotions",
          link: "/",
        },
      ],
    },
    {
      title: "Company",
      tabs: [
        {
          name: "Contact",
          link: "/",
        },
        {
          name: "Blog",
          link: "/",
        },
        {
          name: "FAQ",
          link: "/",
        },
      ],
    },
    {
      title: "Legal",
      tabs: [
        {
          name: "Privacy",
          link: "/privacy-policy",
        },
        {
          name: "Terms",
          link: "/terms-and-conditions",
        },
      ],
    },
  ];

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-primaryDark dark:text-white">
      <div className="py-10 px-5 md:px-7">
        <div className="text-2xl font-bold py-5">GIFT GINNIE</div>
        <div className="pb-8 flex gap-6">
          {footerSocialIcons.map((item, index) => (
            <div key={index} className="w-5 h-5 cursor-pointer">
              {item.icons}
            </div>
          ))}
        </div>
        <div>
          <p className="text-gray-500 font-bold pb-10 dark:text-white lg:w-2/3">
            Welcome to, your fashion destination. Discover the latest trends,
            find perfect pieces for your wardrobe, and enjoy seamless online
            shopping.
          </p>
        </div>
        <div className="flex justify-between  pb-12">
          {footerTabs.map((item, index) => (
            <div key={index}>
              <div className="font-bold text-base pb-4">{item.title}</div>
              <div className="flex flex-col gap-4">
                {item.tabs.map((tab, index) => (
                  <div
                    key={index}
                    className="text-gray-500 font-medium cursor-pointer"
                  >
                    <Link to={tab.link}>{tab.name}</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-500 font-semibold">
          @ 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
