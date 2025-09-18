import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
import {
  VerifyOTPFormSchema,
  type VerifyOTPFormType,
} from "@/components/modules/auth/auth.validetion";

export function VerifyRide() {
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const form = useForm<VerifyOTPFormType>({
    resolver: zodResolver(VerifyOTPFormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });
  const onSubmit = async (data: VerifyOTPFormType) => {
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

      {
        <Dialog>
          <DialogTrigger className="cursor-pointer fixed bottom-0 border-2 right-0 m-4 bg-background text-foreground px-4 py-2 rounded-lg shadow">
            Verify Ride
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <div
                  className={cn(
                    "flex flex-col gap-6 max-w-lg  mx-auto bg-background"
                    // className
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
                          <p className="text-muted-foreground text-balance">
                            Verify your email address
                          </p>
                        </div>

                        {/* <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ex@example.com"
                                required
                                readOnly
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                        <FormField
                          control={form.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OTP 4 digits</FormLabel>
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
      }
    </>
  );
}

// function ProfileForm({ className }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("grid items-start gap-6", className)}>
//       <div className="grid gap-3">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" defaultValue="shadcn@example.com" />
//       </div>
//       <div className="grid gap-3">
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@shadcn" />
//       </div>
//       <Button type="submit">Save changes</Button>
//     </form>
//   );
// }
