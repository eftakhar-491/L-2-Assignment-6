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

const AcceptedRide = () => {
  // 👉 In real use, you’ll replace this with props or Redux data
  const ride = {
    id: "RIDE-12345",
    pickup: "Banani, Dhaka",
    destination: "Dhanmondi, Dhaka",
    price: 350,
    status: "accepted",
    isRideOTPVerified: true,
  };

  const client = {
    name: "John Doe",
    phone: "+8801712345678",
  };

  return (
    <>
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
                <span className="font-semibold">Ride ID:</span> {ride.id}
              </p>
              <p>
                <span className="font-semibold">Pickup:</span> {ride.pickup}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {ride.destination}
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-green-600 font-semibold">
                  ${ride.price}
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
                alert("Ride Picked Up! Drive safely.");
              }}
              ride={ride}
            />

            {ride.status === "IN_TRANSIT" && (
              <Button
                variant="outline"
                className="w-full h-10 rounded-full cursor-pointer bg-green-500"
                onClick={() => alert("Ride Completed!")}
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
