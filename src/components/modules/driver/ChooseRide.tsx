import { useGetDriverNearestRidesMutation } from "@/store/features/driver/driver.api";
import DriverRideList from "./components/DriverRideList";
import Loading from "@/utils/Loading";
import { useEffect } from "react";
import { toast } from "sonner";
import IsDriverRideAccept from "./components/IsDriverRideAccept";

const ChooseRide = () => {
  const [getDriverNearestRides, { isLoading, data }] =
    useGetDriverNearestRidesMutation();
  console.log(data);
  const getDriverRides = async () => {
    try {
      await getDriverNearestRides({
        latitude: 40.7128,
        longitude: -74.006,
      });
    } catch (error) {
      toast.error("Failed to fetch rides");
    }
  };
  useEffect(() => {
    getDriverRides();
  }, []);
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      <IsDriverRideAccept>
        <DriverRideList rides={data?.data || []} />
      </IsDriverRideAccept>
    </>
  );
};

export default ChooseRide;
