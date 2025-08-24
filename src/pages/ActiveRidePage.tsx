"use client";

import { useParams } from "react-router-dom";
import { MapPin, User } from "lucide-react";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { useActiveRide } from "../hooks/useActiveRide";
import { useEffect } from "react";
import { realtimeConnection } from "@/realtime/connection";
import { useQueryClient } from "@tanstack/react-query";
import type { Ride } from "@/types/domain";
import { ButtonStatusRide } from "@/components/ButtonStatusRide";
import { getStatusText } from "@/utils/getStatus";

export const ActiveRidePage = () => {
  const { id } = useParams<{ id: string }>();
  const rideId = id ? Number.parseInt(id, 10) : 0;
  const { ride, isLoading, error, updateStatus, isUpdating } =
    useActiveRide(rideId);

  const queryClient = useQueryClient();

  useEffect(() => {
    realtimeConnection.connect();

    const unsubscribe = realtimeConnection.onEvent((event) => {
      if (event.type === "rideUpdated" && event.payload.ride.id === rideId) {
        queryClient.setQueryData(["ride", rideId], (oldRide: Ride) => ({
          ...oldRide,
          status: event.payload.ride.status,
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [rideId, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loader />
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Failed to load ride details. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Active Ride
            </h2>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
              {getStatusText(ride.status)}
            </div>
          </div>
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  Pickup Location
                </p>
                <p className="text-gray-600">{ride.pickup_address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  Dropoff Location
                </p>
                <p className="text-gray-600">{ride.dropoff_address}</p>
              </div>
            </div>

            {ride.passenger && (
              <div className="flex items-start space-x-4">
                <User className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Passenger
                  </p>
                  <p className="text-gray-600">{ride.passenger.name}</p>
                </div>
              </div>
            )}
          </div>
          <ButtonStatusRide
            status={ride.status}
            updateStatus={({ status }) => updateStatus({ status })}
            isUpdating={isUpdating}
          />
          "
        </div>
      </div>
    </div>
  );
};
