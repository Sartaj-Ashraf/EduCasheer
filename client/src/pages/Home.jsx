import React from "react";

import { Categories, Hero } from "../components";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero />
      <Categories />
    </div>
  );
};

export default Home;
