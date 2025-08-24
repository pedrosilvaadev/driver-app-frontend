"use client";

import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { RideCard } from "@/components/RideCard";
import { useRides } from "@/hooks/useRides";
import { realtimeConnection } from "@/realtime/connection";
import type { Ride } from "@/types/domain";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const RidesPage = () => {
  const { rides, isLoading, error, acceptRide, isAccepting, acceptingRideId } =
    useRides();
  const queryClient = useQueryClient();

  useEffect(() => {
    realtimeConnection.connect();

    const unsubscribe = realtimeConnection.onEvent((event) => {
      if (event.type === "rideAccepted") {
        queryClient.setQueryData<{ rides: Ride[] }>(
          ["rides"],
          (old = { rides: [] }) => {
            console.log({ old });
            const rides = old.rides.filter(
              (ride) => ride.id !== event.payload.ride.id
            );

            return {
              rides,
            };
          }
        );
      }
    });

    return () => {
      unsubscribe();
      realtimeConnection.disconnect();
    };
  }, [queryClient]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Failed to load rides. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Rides
        </h2>

        {isLoading ? (
          <Loader />
        ) : rides.length === 0 ? (
          <EmptyState
            title="No rides available"
            description="Check back later for new ride requests."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onAccept={acceptRide}
                isAccepting={isAccepting && acceptingRideId === ride.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
