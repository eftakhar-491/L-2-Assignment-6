import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useVerifyOTPMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type VerifyAuthOTPFormType } from "@/components/modules/auth/auth.validetion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, User, DollarSign } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { RideProgress } from "../RideProgress";

export function RiderRideDetails() {
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const onCancel = async (data: VerifyAuthOTPFormType) => {
    console.log(data);
    const obj = {
      email: data.email,
      otp: data.otp,
    };
    try {
      const result = await verifyOTP(obj).unwrap();
      toast.success("OTP verified successfully");
      console.log(result);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <>
      {isLoading && <Loading data={isLoading} />}

      <Dialog>
        <DialogTrigger className="cursor-pointer fixed bottom-0 border-2 right-0 m-4 bg-background text-foreground px-4 py-2 rounded-lg shadow">
          Show Ride Details
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ride details</DialogTitle>
            <DialogDescription asChild>
              <div className={cn("flex flex-col gap-6  bg-background")}>
                {/* Ride Request Card */}
                <div className="flex items-center gap-4 mt-3">
                  <Avatar>
                    <AvatarImage src="" alt="John Doe" />
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">John Doe</CardTitle>
                    <p className="text-sm text-gray-500">Ride Request</p>
                  </div>
                </div>

                {/* Pickup */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Pickup: Banani, Dhaka
                  </span>
                </div>

                {/* Destination */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Destination: Dhanmondi, Dhaka
                  </span>
                </div>

                {/* Fare & Distance */}
                <div className="flex justify-between mt-3 p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-1 text-gray-700 font-medium">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                    <span>$250</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700 font-medium">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>8.5 km</span>
                  </div>
                </div>
                <RideProgress />
                {/* Slide to Pickup */}
                <div className=" ">
                  <Button
                    onClick={() => onCancel({ email: "", otp: "" })}
                    variant="destructive"
                    className="w-full cursor-pointer"
                  >
                    Cancel Ride
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
