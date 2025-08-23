import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormProps {
  name: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  handleSubmit: UseFormHandleSubmit<FormProps>;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
  onSubmit: (data: FormProps) => void;
  signUpError: Error | null;
  isSigningUp: boolean;
}

export const SignUpForm = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  signUpError,
  isSigningUp,
}: SignUpFormProps) => {
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

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

      {signUpError && (
        <div className="text-red-600 text-sm text-center">
          Sign up failed. Please check your input.
        </div>
      )}

      <div>
        <Button type="submit" disabled={isSigningUp} className="w-full">
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};
