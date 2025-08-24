import type { Ride } from "@/types/domain";

export interface RideAcceptedEvent {
  type: "rideAccepted";
  payload: {
    ride: Ride;
  };
}

export interface RideStatusChangedEvent {
  type: "rideUpdated";
  payload: {
    ride: Ride;
  };
}

export type RealtimeEvent = RideAcceptedEvent | RideStatusChangedEvent;
