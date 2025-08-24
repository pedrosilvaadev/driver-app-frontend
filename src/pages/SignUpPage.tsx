"use client";

import { Car } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useSignUp } from "@/hooks/useSignUp";
import { SignUpForm } from "@/components/SignUpForm";
import type { MessageErrorAPI } from "@/types/domain";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpPage = () => {
  const { signUp, signUpError, isSigningUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
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
        <SignUpForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isSigningUp={isSigningUp}
          signUpError={signUpError as MessageErrorAPI}
        />
      </div>
    </div>
  );
};
