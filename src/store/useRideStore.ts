import { create } from "zustand"

interface RideState {
  activeRideId: number | null
  setActiveRide: (rideId: number) => void
  clearActiveRide: () => void
}

export const useRideStore = create<RideState>((set) => ({
  activeRideId: null,
  setActiveRide: (rideId: number) => set({ activeRideId: rideId }),
  clearActiveRide: () => set({ activeRideId: null }),
}))
