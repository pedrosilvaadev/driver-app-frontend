import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { signUp as signUpApi } from "@/api/signUp";
import { toast } from "sonner";

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
      toast.success("Sign up successful! Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      toast.error("Sign up failed. Please try again.");
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
