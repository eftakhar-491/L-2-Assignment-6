import { z } from "zod";

export const RegisterFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.email().min(2).max(100),
  password: z.string().min(8).max(100),
  role: z.enum(["RIDER", "DRIVER", "ADMIN"]),
});
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
