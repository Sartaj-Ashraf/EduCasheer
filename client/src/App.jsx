import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import React, { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext";

const App = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);
  return (
    <>
      <Toaster />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};
export default App;
