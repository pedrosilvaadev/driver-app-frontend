"use client";

import { Car } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { LoginForm } from "@/components/LoginForm";
import type { MessageErrorAPI } from "@/types/domain";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, isLoggingIn, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Car className="mx-auto h-16 w-16 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            URIDE Driver
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your driver account
          </p>
        </div>
        <LoginForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isLoggingIn={isLoggingIn}
          loginError={loginError as MessageErrorAPI}
        />

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
