import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Public from "./pages/Public";
import Dashboard from "./pages/Dashboard";
import NotAuthContainer from "./containers/NotAuthContainer";
import AuthContainer from "./containers/AuthContainer";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <NotAuthContainer>
          <Login />
        </NotAuthContainer>
      ),
    },
    {
      path: "/register",
      element: (
        <NotAuthContainer>
          <Register />
        </NotAuthContainer>
      ),
    },
    {
      path: "/:username",
      element: <Public />,
    },
    {
      path: "/dashboard",
      element: (
        <AuthContainer>
          <Dashboard />
        </AuthContainer>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
