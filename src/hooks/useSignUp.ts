import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { signUp as signUpApi } from "@/api/signUp";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const { clear } = useAuthStore();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpData) => signUpApi(data),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });

  const signUp = (data: SignUpData) => signUpMutation.mutate(data);
  const clearSignUp = () => clear();

  return {
    signUp,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,
    clearSignUp,
  };
};
