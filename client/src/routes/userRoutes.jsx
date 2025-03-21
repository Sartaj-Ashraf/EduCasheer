import React, { Suspense } from "react";
import { UserProfile } from "../pages";
export const userRoutes = [
  {
    path: "/user",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <UserProfile />
      </Suspense>
    ),
  },
];
