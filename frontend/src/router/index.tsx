import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/home";
import { AppLayout } from "@layout/AppLayout";
import Explore from "@pages/explore";
import ProviderDetails from "@pages/provider";
import Login from "@pages/login";
import ProtectedLayout from "@layout/ProtectedLayout";
import Register from "@pages/register";
import Profile from "@pages/profile";
import Dashboard from "@components/screens/Dashboard";
import GuestLayout from "@layout/GuestLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      { path: "/explore", element: <Explore /> },

      {
        element: <GuestLayout />,
        children: [
          { path: "/login", element: <Login /> },
          {
            path: "/register",
            element: <Register onLoginSuccess={() => {}} />,
          },
        ],
      },

      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/provider/:id",
            element: <ProviderDetails />,
          },
          { path: "/profile", element: <Profile /> },

          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
]);
