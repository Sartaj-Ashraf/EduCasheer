import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import React, { useMemo } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);
  <Toaster />;
  return <RouterProvider router={router} />;
};
export default App;
