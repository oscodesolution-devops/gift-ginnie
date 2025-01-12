import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full bg-primary dark:bg-primaryDark">
        {children}
      </div>
      <Footer />
    </div>
  );
}
