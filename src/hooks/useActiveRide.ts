import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRide, updateRideStatus } from "../api/rides";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useActiveRide = (rideId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const rideQuery = useQuery({
    queryKey: ["ride", rideId],
    queryFn: () => getRide(rideId),
    enabled: !!rideId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ status }: { status: "picked_up" | "dropped_off" }) =>
      updateRideStatus(rideId, status),
    onSuccess: ({ ride: updatedRide }) => {
      queryClient.setQueryData(["ride", rideId], { ride: updatedRide });
      queryClient.invalidateQueries({ queryKey: ["rides"] });

      toast.success("Ride status updated successfully!");

      if (updatedRide.status === "dropped_off") {
        navigate("/rides");
      }
    },
    onError: (error) => {
      console.error("Failed to update ride status:", error);
      toast.error("Failed to update ride status.");
    },
  });

  return {
    ride: rideQuery.data?.ride,
    isLoading: rideQuery.isLoading,
    error: rideQuery.error,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};
