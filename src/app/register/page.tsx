"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import AuthButtons from "../../components/AuthButtons";
import AuthSection from "../../components/AuthSection";
import InputComponent from "../../components/Input";

const RegisterSchema = z
  .object({
    firstname: z
      .string()
      .min(3, { message: "Firstname must be at least 3 characters." })
      .max(20, { message: "Firstname must not exceed 20 characters." })
      .nonempty({ message: "Firstname is required" }),
    lastname: z
      .string()
      .min(3, { message: "Lastname must be at least 3 characters." })
      .max(20, { message: "Lastname must not exceed 20 characters." })
      .nonempty({ message: "Lastname is required" }),
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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    toast({
      title: "Registration Successful",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <AuthSection authType="Register">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <InputComponent
          inputType="text"
          placeholder="Username"
          register={form.register("firstname")}
          error={form.formState.errors.firstname}
        />

        <InputComponent
          inputType="text"
          placeholder="Username"
          register={form.register("lastname")}
          error={form.formState.errors.lastname}
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
