import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loading from "@/utils/Loading";
import { toast } from "sonner";
import {
  ridePriceValidationSchema,
  type RidePriceType,
} from "../ride.validetion";
import { usePriceAndDetailsMutation } from "@/store/features/ride/ride.api";
import { useAppSelector } from "@/store/hook";
import ShowPriceDetails from "./modal/ShowPriceDetails";
import { useState } from "react";

export default function LocationInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = useState(false);
  const [rideDetails, setRideDetails] = useState(null);
  const form = useForm<RidePriceType>({
    resolver: zodResolver(ridePriceValidationSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
    },
  });
  const user = useAppSelector((state) => state?.auth.user);
  console.log("USER", user);
  const [priceAndDetails, { isLoading }] = usePriceAndDetailsMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    const obj = {
      rider: user?._id,
      pickupLocation: { address: data.pickupLocation },
      dropoffLocation: { address: data.dropoffLocation },
    };
    try {
      const result = await priceAndDetails(obj);
      console.log(result);
      if ("error" in result && result.error) {
        // @ts-expect-error: result.error may have a data property depending on API error shape
        toast.error(result.error?.data?.message || "request failed!");
      }

      if ("data" in result && result.data) {
        setRideDetails(result.data.data);
        setOpen(true);
        toast.success("Ride details fetched successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Request failed! Please try again.");
    }
  };
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      <ShowPriceDetails
        open={open}
        setOpen={setOpen}
        setRideDetails={setRideDetails}
        rideDetails={rideDetails}
      />
      <div
        className={cn(
          "flex flex-col gap-6 w-2/5 my-24 mx-auto mt-0",
          className
        )}
        {...props}
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Book A Ride</h1>
                    <p className="text-muted-foreground text-balance">
                      {/* Login to your Acme Inc account */}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter pickup location"
                            required
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dropoffLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dropoff Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter dropoff location"
                            required
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Search
                  </Button>

                  <div className="grid grid-cols-1 gap-4"></div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
