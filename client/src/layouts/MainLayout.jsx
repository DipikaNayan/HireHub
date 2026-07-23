import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
