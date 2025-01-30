import React from "react";

import { Categories, Hero, PopularCourses } from "../components";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero />
      <Categories />
      <PopularCourses />
    </div>
  );
};

export default Home;
