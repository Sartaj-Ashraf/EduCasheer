import React, { Suspense } from "react";
import { Login, Register } from "../pages";
import { registerAction } from "../pages/auth/Register";
// import { loginAction } from "../pages/auth/Login";

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
  {
    path: "/login",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <Login />
      </Suspense>
    ),
    // action: loginAction,
  },
];
