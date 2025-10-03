import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGetMeQuery } from "@/store/features/auth/auth.api";
import { useRequestRideMutation } from "@/store/features/ride/ride.api";

import Loading from "@/utils/Loading";
import { toast } from "sonner";

const ShowPriceDetails = ({
  open,
  setOpen,
  rideDetails,
  setRideDetails,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  rideDetails: any;
  setRideDetails: (data: any) => void;
}) => {
  const { data } = useGetMeQuery(undefined);
  const user = data?.data;
  console.log("data", user);
  const [requestRide, { isLoading }] = useRequestRideMutation();
  const onSubmit = async () => {
    const obj = {
      fee: rideDetails.fee,
      rider: user?._id,
      pickupLocation: {
        address: rideDetails.pickupLocation.address,
      },
      dropoffLocation: {
        address: rideDetails.dropoffLocation.address,
      },
    };
    console.log(obj);
    try {
      const result = await requestRide(obj).unwrap();
      console.log("Ride requested successfully:", result);
      toast.success("Ride requested successfully!");
    } catch (error) {
      console.error("Error requesting ride:", error);
      toast.error("Failed requesting ride. try again!");
    }
    setOpen(false);
    setRideDetails(null);
  };
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      {rideDetails && (
        <Drawer open={open} onOpenChange={setOpen}>
          {/* <DrawerTrigger>Open</DrawerTrigger> */}
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Confirm Ride Details</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 px-4 py-2 max-w-xl min-w-[300px] m-auto">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground font-medium">
                    Pickup Location
                  </span>
                  <span className="font-semibold">
                    {rideDetails.pickupLocation.address}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground font-medium">
                    Dropoff Location
                  </span>
                  <span className="font-semibold">
                    {rideDetails.dropoffLocation.address}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    Estimated Price
                  </span>
                  <span className="font-bold text-primary text-lg">
                    {rideDetails.fee} TK
                  </span>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                className="max-w-xl min-w-[300px] m-auto"
                onClick={onSubmit}
              >
                Submit
              </Button>
              <DrawerClose>
                <Button className="max-w-xl m-auto" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ShowPriceDetails;
