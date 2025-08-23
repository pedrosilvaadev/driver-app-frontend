import type { SignUpResponse } from "../types/domain";
import apiClient from "./client";

export const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<SignUpResponse> => {
  const response = await apiClient.post("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};
