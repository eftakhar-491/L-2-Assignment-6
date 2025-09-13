import { Outlet } from "react-router";
import Navbar from "../Nav/CommonNavbar/Navbar";
import Footer from "../footer/Footer";
import getUserInLocal from "@/helper/getUserInLocal";

const RideLayout = () => {
  getUserInLocal();

  return (
    <>
      <Navbar />
      <div className="">{<Outlet />}</div>

      <Footer />
    </>
  );
};

export default RideLayout;
