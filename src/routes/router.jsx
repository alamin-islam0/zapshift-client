import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/home/Home";
import Coverage from "../pages/coverage/Coverage";
import About from "../pages/about/About";
import Error from "../pages/error/Error";

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
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        Component: About,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
