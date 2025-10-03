import type React from "react";
import AcceptedRide from "../AcceptedRide";
import { useGetMeQuery } from "@/store/features/auth/auth.api";

const IsDriverRideAccept = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useGetMeQuery(undefined);
  console.log(user);
  if (user?.data?.isRideAccepted) {
    return <AcceptedRide />;
  }
  return <div>{children}</div>;
};

export default IsDriverRideAccept;
