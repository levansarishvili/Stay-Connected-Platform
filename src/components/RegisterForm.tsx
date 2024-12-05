"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import AuthButtons from "@/components/AuthButtons";
import AuthSection from "@/components/AuthSection";
import InputComponent from "@/components/Input";

const RegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must not exceed 20 characters." })
      .nonempty({ message: "Username is required" }),
    last_name: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must not exceed 20 characters." })
      .nonempty({ message: "Username is required" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must not exceed 20 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Registration failed");

      const result = await response.json();
      console.log("Registration successful:", result);

      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
      });

      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ title: "Error", description: error.message });
      } else {
        toast({ title: "Error", description: "An unexpected error occurred" });
      }
    }
  }

  return (
    <AuthSection authType="Register">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <InputComponent
          inputType="text"
          placeholder="Firstname"
          register={form.register("first_name")}
          error={form.formState.errors.first_name}
        />
        <InputComponent
          inputType="text"
          placeholder="Lastname"
          register={form.register("last_name")}
          error={form.formState.errors.last_name}
        />
        <InputComponent
          inputType="email"
          placeholder="Email"
          register={form.register("email")}
          error={form.formState.errors.email}
        />
        <InputComponent
          inputType="password"
          placeholder="Password"
          register={form.register("password")}
          error={form.formState.errors.password}
        />
        <InputComponent
          inputType="password"
          placeholder="Confirm Password"
          register={form.register("confirmPassword")}
          error={form.formState.errors.confirmPassword}
        />
        <AuthButtons loginBtn={false} registerBtn={true} />
      </form>
    </AuthSection>
  );
};

export default Register;
