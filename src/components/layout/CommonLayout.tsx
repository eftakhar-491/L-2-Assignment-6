import type { ReactNode } from "react";
import Footer from "../footer/Footer";
import Navbar from "@/components/Nav/CommonNavbar/Navbar";

interface IProps {
  children: ReactNode;
}

function CommonLayout({ children }: IProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
export default CommonLayout;
