import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const HomeOutlet = () => {
  return (
    <>
        <ScrollRestoration />
        <Header />
      <div className="container mx-auto p-8 m-8">
        <Outlet />
      </div>
        <Footer />
    </>
  );
};
// export const useHomeLayoutContext = () => useContext(homeLayoutContext);
export default HomeOutlet;
