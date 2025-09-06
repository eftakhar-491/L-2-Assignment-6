import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authimg from "@/assets/authimg.jpg";
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
import { RegisterFormSchema, type RegisterFormType } from "./auth.validetion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";
import { useState } from "react";

export function Register({ className, ...props }: React.ComponentProps<"div">) {
  const [isDriver, setIsDriver] = useState(false);
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const onSubmit = async (data: RegisterFormType) => {
    console.log(data);
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      vehicle: {
        type: data.vehicle?.type,
        number: data.vehicle?.number,
        model: data.vehicle?.model,
      },
    };
    try {
      console.log(data);

      const result = await register(userInfo).unwrap();

      toast.success("Registration successful");
      console.log(result);
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed");
      console.error("Registration failed:", error);
    }
  };
  return (
    <>
      <Loading data={isLoading} />
      <div
        className={cn("flex flex-col gap-6 max-w-5xl my-24 mx-auto", className)}
        {...props}
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your Acme Inc account
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="text-left w-full justify-between bg-input"
                              >
                                {field.value || "Select a role"}
                                <ChevronDownIcon
                                  className="-me-1 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
                              <DropdownMenuItem
                                onSelect={() => {
                                  field.onChange("RIDER");
                                  setIsDriver(false);
                                }}
                              >
                                RIDER
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => {
                                  field.onChange("DRIVER");
                                  setIsDriver(true);
                                }}
                              >
                                DRIVER
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => {
                                  field.onChange("ADMIN");
                                  setIsDriver(false);
                                }}
                              >
                                ADMIN
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* is driver selected */}
                  {isDriver && (
                    <>
                      <FormField
                        control={form.control}
                        name="vehicle.type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle type</FormLabel>
                            <FormControl>
                              <Input placeholder="Car, Bike" {...field} />
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
                        name="vehicle.number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle number</FormLabel>
                            <FormControl>
                              <Input placeholder="DM-LA-19-5458" {...field} />
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
                        name="vehicle.model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle model</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Vehicle model name"
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
                    </>
                  )}

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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div> */}
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      {/* className="sr-only" */}
                      <span>Login with Google</span>
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Login
                    </a>
                  </div>
                </div>
              </form>
            </Form>

            <div className="bg-muted relative hidden md:block">
              <img
                src={authimg}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover "
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
