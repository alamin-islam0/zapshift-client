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
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/MyParcel/MyParcels";
import Overview from "../pages/dashboard/Overview/Overview";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentSuccess from "../pages/dashboard/payment/paymentSuccess";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";

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
        element: <PrivateRoute><Rider /></PrivateRoute>
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
        element: <PrivateRoute><SendParcel /></PrivateRoute>,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json())
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
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        Component: Overview
      },
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'add-parcel',
        Component: SendParcel,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json())
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      }
    ]
  },
  {
    path: "*",
    Component: Error,
  },
]);
