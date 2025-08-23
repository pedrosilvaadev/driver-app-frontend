import type { LoginResponse } from "../types/domain";
import apiClient from "./client";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};
