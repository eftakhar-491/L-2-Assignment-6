import ChooseRide from "./ChooseRide";
import DriverDashboard from "./DriverDashboard";

const driverRoute = [
  {
    path: "dashboard",
    Component: DriverDashboard,
  },
  {
    path: "choose-ride",
    Component: ChooseRide,
  },
];

export default driverRoute;
