import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRides, acceptRide } from "../api/rides";
import { useNavigate } from "react-router-dom";
import { useRideStore } from "@/store/useRideStore";
import { useState } from "react";

export const useRides = () => {
  const queryClient = useQueryClient();
  const { setActiveRide } = useRideStore();
  const navigate = useNavigate();
  const [acceptingRideId, setAcceptingRideId] = useState<number | null>(null);

  const ridesQuery = useQuery({
    queryKey: ["rides"],
    queryFn: getRides,
  });

  const acceptRideMutation = useMutation({
    mutationFn: (rideId: number) => {
      setAcceptingRideId(rideId);
      return acceptRide(rideId);
    },
    onSuccess: ({ ride }) => {
      setActiveRide(ride.id);
      queryClient.invalidateQueries({ queryKey: ["rides"] });
      navigate(`/active-ride/${ride.id}`);
    },
    onError: (error) => {
      console.error("Failed to accept ride:", error);
    },
  });

  return {
    rides: ridesQuery.data?.rides || [],
    isLoading: ridesQuery.isLoading,
    error: ridesQuery.error,
    acceptRide: acceptRideMutation.mutate,
    isAccepting: acceptRideMutation.isPending,
    acceptingRideId,
  };
};
