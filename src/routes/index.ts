import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import { Register } from "@/components/modules/auth/Register";
import { Login } from "@/components/modules/auth/Login";
import { Verify } from "@/components/modules/auth/Verify";
import RideLayout from "@/components/layout/RideLayout";

import rideRoute from "@/components/modules/ride/ride.route";
import driverRoute from "@/components/modules/driver/driver.route";
import DriverLayout from "@/components/layout/DriverLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },

      {
        path: "about",
        Component: About,
      },
      {
        path: "register",
        Component: Register,
      },

      {
        path: "login",
        Component: Login,
      },
      {
        path: "verify",
        Component: Verify,
      },
    ],
  },
  {
    path: "/ride",
    Component: RideLayout,
    children: [...rideRoute],
  },
  {
    path: "/driver",
    Component: DriverLayout,
    children: [...driverRoute],
  },
]);

export default router;
