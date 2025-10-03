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
import {
  VerifyAuthOTPFormSchema,
  type VerifyAuthOTPFormType,
} from "./auth.validetion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router";
import { useVerifyOTPMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";

export function Verify({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const form = useForm<VerifyAuthOTPFormType>({
    resolver: zodResolver(VerifyAuthOTPFormSchema),
    defaultValues: {
      email: email || "",
      otp: "",
    },
  });
  const onSubmit = async (data: VerifyAuthOTPFormType) => {
    console.log(data);
    const obj = {
      email: data.email,
      otp: data.otp,
    };
    try {
      const result = await verifyOTP(obj).unwrap();
      toast.success("OTP verified successfully");
      navigate("/");
      console.log(result);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };
  return (
    <>
      {isLoading && <Loading data={isLoading} />}
      <div
        className={cn("flex flex-col gap-6 max-w-lg my-24 mx-auto", className)}
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
                    <h1 className="text-2xl font-bold">Verify OTP</h1>
                    <p className="text-muted-foreground text-balance">
                      Verify your email address
                    </p>
                  </div>

                  <FormField
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
                        {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP</FormLabel>
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

                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
