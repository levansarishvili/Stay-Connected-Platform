// import React from "react";
// import InputComponent from "../../components/Input";
// import AuthButtons from "../../components/AuthButtons";
// import AuthSection from "../../components/AuthSection";

// const LoginPage = () => {
//   return (
//     <AuthSection authType="Log In">
//       <InputComponent inputType={"email"} placeholder={"Login"} />
//       <InputComponent inputType={"password"} placeholder={"Password"} />
//       <AuthButtons loginBtn={true} registerBtn={false} />
//     </AuthSection>
//   );
// };

// export default LoginPage;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import AuthButtons from "../../components/AuthButtons";
import AuthSection from "../../components/AuthSection";
import InputComponent from "../../components/Input";

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not exceed 20 characters.",
    })
    .min(1, {
      message: "Password is required",
    }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Login Successful",
      description: (
        <pre className="absolute top-0 mt-4 w-[340px] rounded-lg bg-gray-900 p-10 shadow-lg border border-gray-700">
          <code className="block text-white text-md font-mono whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <AuthSection authType="Log In">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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

        <AuthButtons loginBtn={true} registerBtn={false} />
      </form>
    </AuthSection>
  );
};
export default LoginPage;
