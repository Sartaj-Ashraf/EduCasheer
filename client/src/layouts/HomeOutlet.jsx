import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const HomeOutlet = () => {
  return (
    <>
      <div>
        <ScrollRestoration />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
// export const useHomeLayoutContext = () => useContext(homeLayoutContext);
export default HomeOutlet;
