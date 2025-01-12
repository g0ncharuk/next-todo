import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegistrationSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum of 6 charactrs required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const taskSchema = z.object({
    id: z.string().optional(),
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Task name must be 100 characters or less"),
    content: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
