import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username is to short" })
      .max(255, { message: "Username is too long" }),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(255, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username is to short" })
    .max(255, { message: "Username is too long" }),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(255, { message: "Password is too long" }),
});

export const askQuestionSchema = z.object({
  title: z
    .string()
    .min(15, { message: "Enter atleast 15 characters" })
    .max(255, { message: "Title is too long" }),
  body: z
    .string()
    .min(30, { message: "Enter atleast 30 characters" })
    .max(500, { message: "Body is too long" }),

  // tags: z.array(z.string()).min(1, { message: "Select atleast one tag" }),
});
