import React, { Suspense } from "react";
import { Register } from "../pages";
import { registerAction } from "../pages/auth/Register";

export const authRoutes = [
  {
    path: "/register",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <Register />
      </Suspense>
    ),
    action: registerAction,
  },
];
