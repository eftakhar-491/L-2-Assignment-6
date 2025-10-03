import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRideOtpVerifyMutation } from "@/store/features/ride/ride.api";
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
import {
  VerifyOTPFormSchema,
  type VerifyOTPFormType,
} from "@/components/modules/auth/auth.validetion";
import { useGetMyAcceptedRideQuery } from "@/store/features/driver/driver.api";
import { useEffect } from "react";

export function VerifyRide() {
  const [verifyOTP, { isLoading }] = useRideOtpVerifyMutation();
  const { data: rideData, isFetching } = useGetMyAcceptedRideQuery(undefined);

  const form = useForm<VerifyOTPFormType>({
    resolver: zodResolver(VerifyOTPFormSchema),
    defaultValues: {
      otp: "",
      _id: "", // start empty
    },
  });

  // Reset form values when rideData loads
  useEffect(() => {
    if (rideData?.data?.[0]?._id) {
      form.reset({
        _id: rideData.data[0]._id,
        otp: "",
      });
    }
  }, [rideData, form]);

  const onSubmit = async (data: VerifyOTPFormType) => {
    try {
      const result = await verifyOTP(data).unwrap();
      toast.success("OTP verified successfully");
      console.log(result);
    } catch (error) {
      toast.error("OTP verification failed. Try again!");
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <>
      {(isLoading || isFetching) && <Loading data={isLoading || isFetching} />}

      <Dialog>
        <DialogTrigger className="cursor-pointer fixed bottom-0 border-2 right-0 m-4 bg-background text-foreground px-4 py-2 rounded-lg shadow">
          Verify Ride
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Ride OTP</DialogTitle>
            <DialogDescription>
              <div
                className={cn(
                  "flex flex-col gap-6 max-w-lg mx-auto bg-background"
                )}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold text-foreground">
                          Ride OTP
                        </h1>
                        <div className="text-muted-foreground text-balance">
                          Enter the OTP sent for ride verification
                        </div>
                      </div>

                      {/* OTP Input */}
                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OTP (4 digits)</FormLabel>
                            <FormControl>
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup className="w-full">
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Hidden _id field */}
                      <input type="hidden" {...form.register("_id")} />

                      <Button type="submit" className="w-full cursor-pointer">
                        Verify OTP
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
