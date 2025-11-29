import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/home/Home";
import Coverage from "../pages/coverage/Coverage";
import About from "../pages/about/About";
import Error from "../pages/error/Error";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'rider',
        element: <PrivateRoute><Rider/></PrivateRoute>
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        Component: About,
      },
      {
        path: 'send-parcel',
        element: <PrivateRoute><SendParcel/></PrivateRoute>
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        },
    ]
  },
  {
    path: "*",
    Component: Error,
  },
]);
