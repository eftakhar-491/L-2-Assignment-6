import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import PickedupRide from "./components/PickedupRide";
import { VerifyRide } from "./components/Modal/VerifyRide";
import {
  useRideCompleteMutation,
  useRidePickedupMutation,
} from "@/store/features/ride/ride.api";
import Loading from "@/utils/Loading";
import { useGetMyAcceptedRideQuery } from "@/store/features/driver/driver.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { baseApi } from "@/store/baseApi";

const AcceptedRide = () => {
  const [ridePickedup, { isLoading }] = useRidePickedupMutation();
  const [rideComplete, { isLoading: rideCompleteLoading }] =
    useRideCompleteMutation();
  const dispatch = useDispatch();

  const { data } = useGetMyAcceptedRideQuery(undefined);

  const ride = data?.data[0] || {};
  console.log("ride", ride);
  const client = {
    name: "John Doe",
    phone: "+8801712345678",
  };
  const onComplete = () => {
    try {
      rideComplete({ _id: ride._id, status: "COMPLETED" });
      dispatch(baseApi.util.resetApiState());
      toast.success("Ride completed successfully");
    } catch (error) {
      toast.error("Failed to complete ride");
      console.error("Error completing ride:", error);
    }
  };
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      {rideCompleteLoading && <Loading data={rideCompleteLoading} />}
      <VerifyRide />
      <div className="  p-6">
        <Card className="rounded-2xl shadow-lg border bg-background">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              🚖 Accepted Ride
            </CardTitle>
            <CardDescription>
              Here are the ride and client details
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ride Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Ride Information</h3>
              <p>
                <span className="font-semibold">Ride ID:</span>
              </p>
              <p>
                <span className="font-semibold">Pickup:</span>{" "}
                {ride?.pickupLocation?.address}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {ride?.dropoffLocation?.address}
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-green-600 font-semibold">
                  ${ride?.fee}
                </span>
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                  {ride.status}
                </span>
              </p>
            </div>

            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Client Information</h3>
              <p>
                <span className="font-semibold">Name:</span> {client.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {client.phone}
              </p>
              <Button
                className="w-full flex items-center justify-center gap-2 rounded-xl"
                onClick={() => (window.location.href = `tel:${client.phone}`)}
              >
                <Phone className="w-4 h-4" />
                Call Client
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-4 flex-wrap lg:flex-nowrap ">
            <PickedupRide
              onPickup={() => {
                ridePickedup({ _id: ride._id, status: "PICKED_UP" });
              }}
              ride={ride}
            />

            {ride.status === "IN_TRANSIT" && (
              <Button
                variant="outline"
                className="w-full h-10 rounded-full cursor-pointer bg-green-500"
                onClick={onComplete}
              >
                Complete
              </Button>
            )}
            <Button
              variant="destructive"
              className="w-full h-10 rounded-full cursor-pointer"
              onClick={() => alert("Ride Cancelled")}
            >
              Cancel Ride
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AcceptedRide;
