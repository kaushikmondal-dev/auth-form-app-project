import z from "zod";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
