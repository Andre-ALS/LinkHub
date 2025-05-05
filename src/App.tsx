import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Public from "./pages/Public";
import Dashboard from "./pages/Dashboard";
import AuthRoutes from "./components/Auth";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/:username",
      element: <Public />,
    },
    {
      element: <AuthRoutes />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
