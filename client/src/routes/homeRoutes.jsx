import React, { Suspense } from "react";
import Home from "../pages/Home";

export const homeRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <Home />
      </Suspense>
    ),
  },
  //   {
  //     element: (
  //       <Suspense fallback={<Loader />}>
  //         <About />
  //       </Suspense>
  //     ),
  //     path: "/about",
  //   },
  // Contact
  //   {
  //     element: (
  //       <Suspense fallback={<Loader />}>
  //         <Contact />
  //       </Suspense>
  //     ),
  //     path: "/contact",
  //   },
];
