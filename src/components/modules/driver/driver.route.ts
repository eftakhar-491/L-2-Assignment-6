import withAuth from "@/utils/withAuth";
import ChooseRide from "./ChooseRide";
import DriverDashboard from "./DriverDashboard";
import Role from "@/constent/Role";

const driverRoute = [
  {
    path: "dashboard",
    Component: withAuth(DriverDashboard, Role.DRIVER),
  },
  {
    path: "choose-ride",
    Component: withAuth(ChooseRide, Role.DRIVER),
  },
];

export default driverRoute;
