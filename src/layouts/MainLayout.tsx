import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useVideoContext } from "../context/MainVideo";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isInVideoSection } = useVideoContext();

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div
        className={`w-full bg-primary dark:bg-primaryDark ${
          isInVideoSection ? "" : "mt-10"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
