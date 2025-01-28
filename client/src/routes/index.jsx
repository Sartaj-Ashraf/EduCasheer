import React, { lazy, Suspense } from "react";

import HomeOutlet from "../layouts/HomeOutlet";
import { homeRoutes } from "./homeRoutes";

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <HomeOutlet />
      </Suspense>
    ),

    // Routes that need homeOutlet, meaning pages that need header and footer

    children: [...homeRoutes],
  },
  // Routes that dont need the header and footer
  // ...destinationsRoutes,
  //   ...authRoutes,
];
