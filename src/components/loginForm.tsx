import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormProps {
  email: string;
  password: string;
}
interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FormProps>;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
  onSubmit: (data: FormProps) => void;
  loginError: Error | null;
  isLoggingIn: boolean;
}
export const LoginForm = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  loginError,
  isLoggingIn,
}: LoginFormProps) => {
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      {loginError && (
        <div className="text-red-600 text-sm text-center">
          Login failed. Please check your credentials.
        </div>
      )}

      <div>
        <Button type="submit" disabled={isLoggingIn} className="w-full">
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
};
