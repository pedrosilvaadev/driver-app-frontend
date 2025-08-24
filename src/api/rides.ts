import type { Ride } from "../types/domain";
import apiClient from "./client";

export const getRides = async (): Promise<{ rides: Ride[] }> => {
  const response = await apiClient.get("/rides");
  return response.data;
};

export const getRide = async (id: number): Promise<{ ride: Ride }> => {
  const response = await apiClient.get(`/rides/${id}`);
  return response.data;
};

export const acceptRide = async (id: number): Promise<{ ride: Ride }> => {
  const response = await apiClient.patch(`/rides/${id}/accept`);
  return response.data;
};

export const updateRideStatus = async (
  id: number,
  status: "picked_up" | "dropped_off"
): Promise<{ ride: Ride }> => {
  const response = await apiClient.put(`/rides/${id}/status`, { status });
  return response.data;
};
