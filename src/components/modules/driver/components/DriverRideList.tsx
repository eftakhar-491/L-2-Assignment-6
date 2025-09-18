import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRideAcceptMutation } from "@/store/features/ride/ride.api";
import Loading from "@/utils/Loading";
import { toast } from "sonner";

interface Ride {
  _id: string;
  driver: string;
  passenger: string;
  pickup: string;
  dropoff: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropoffLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  fee: number; // Added fee property
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "PICKED_UP"
    | "IN_TRANSIT"
    | "COMPLETED"
    | "CANCELLED";
}

const RideItem = ({ ride }: { ride: Ride }) => {
  const [rideAccept, { isLoading }] = useRideAcceptMutation();

  const handleAccept = async (id: string) => {
    try {
      const result = await rideAccept({ _id: id, status: "ACCEPTED" }).unwrap();
      toast.success("Ride accepted successfully");
      console.log("Ride accepted:", result);
    } catch (error) {
      toast.error("Failed to accept ride");
    }
  };
  const date = new Date(ride.createdAt);

  const formatted = date.toLocaleString();
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      <Card className="mb-4 shadow-md rounded-2xl hover:shadow-lg transition w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{ride.passenger}</h3>
              <p className="text-sm text-muted-foreground">
                Request At: {formatted}
              </p>
              <p className="text-sm text-muted-foreground">
                Fee: {ride.fee} TK
              </p>
            </div>
            <Badge
              variant={
                ride.status === "COMPLETED"
                  ? "default"
                  : ride.status === "ACCEPTED"
                  ? "secondary"
                  : "outline"
              }
            >
              {ride.status}
            </Badge>
          </div>

          <Separator className="my-3" />
          <div>
            <div className="text-sm">
              <p>
                <span className="font-medium">Pickup:</span>{" "}
                {ride.pickupLocation.address}
              </p>
              <p>
                <span className="font-medium">Dropoff:</span>{" "}
                {ride.dropoffLocation.address}
              </p>
            </div>

            <Button
              onClick={() => handleAccept(ride._id)}
              className="mt-4 w-full cursor-pointer"
            >
              Accept Ride
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const DriverRideList = ({ rides }: { rides: Ride[] }) => {
  return (
    <div className="w-full mx-auto p-4">
      {rides.length > 0 ? (
        rides.map((ride) => <RideItem key={ride._id} ride={ride} />)
      ) : (
        <p className="text-center text-muted-foreground">No rides available</p>
      )}
    </div>
  );
};

export default DriverRideList;
