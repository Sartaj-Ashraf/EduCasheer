import React, { lazy, Suspense } from "react";

import HomeOutlet from "../layouts/HomeOutlet";
import { homeRoutes } from "./homeRoutes";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";

export const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <HomeOutlet />
      </Suspense>
    ),

    // Routes that need homeOutlet, meaning pages that need header and footer

    children: [...homeRoutes, ...userRoutes],
  },
  // Routes that dont need the header and footer
  // ...destinationsRoutes,
  ...authRoutes,
];
