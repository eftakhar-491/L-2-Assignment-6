import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.email().min(2).max(100),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    role: z.enum(["RIDER", "DRIVER", "ADMIN"]),
    vehicle: z
      .object({
        type: z.string().min(2).max(50),
        number: z.string().min(2).max(50),
        model: z.string().min(2).max(50),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.role === "DRIVER") {
        return !!data.vehicle && !!data.vehicle.type;
      }
      return true;
    },
    {
      message: "Vehicle type is required for DRIVER role.",
      path: ["vehicle", "type"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "DRIVER") {
        return !!data.vehicle && !!data.vehicle.number;
      }
      return true;
    },
    {
      message: "Vehicle number is required for DRIVER role.",
      path: ["vehicle", "number"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "DRIVER") {
        return !!data.vehicle && !!data.vehicle.model;
      }
      return true;
    },
    {
      message: "Vehicle model is required for DRIVER role.",
      path: ["vehicle", "model"],
    }
  );

export const VerifyOTPFormSchema = z.object({
  email: z.string().min(2).max(100),
  otp: z.string().min(6).max(6),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type VerifyOTPFormType = z.infer<typeof VerifyOTPFormSchema>;
