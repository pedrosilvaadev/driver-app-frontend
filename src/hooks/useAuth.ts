import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api/auth";
import { toast } from "sonner";

export const useAuth = () => {
  const { token, user, setToken, clear, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      toast.success("Login successful!");
      setToken(data.access_token);
      navigate("/rides");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });

  const logout = () => {
    clear();
    navigate("/login");
  };

  return {
    token,
    user,
    isAuthenticated: isAuthenticated(),
    login: loginMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
};
