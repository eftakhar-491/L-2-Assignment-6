import { useAppSelector } from "@/store/hook";
import type React from "react";
import AcceptedRide from "../AcceptedRide";

const IsDriverRideAccept = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  if (user?.isRideAccepted) {
    return <AcceptedRide />;
  }
  return <div>{children}</div>;
};

export default IsDriverRideAccept;
