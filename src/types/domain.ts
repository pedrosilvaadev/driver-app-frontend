export type DriverStatus = "online" | "offline" | "on-trip";
export type RideStatus =
  | "available"
  | "in_progress"
  | "picked_up"
  | "dropped_off";

export interface Driver {
  id: number;
  name: string;
  email: string;
  current_location?: { lat: number; lng: number };
  status: DriverStatus;
  rating: number;
  total_trips: number;
}

export interface Passenger {
  id: number;
  name: string;
}

export interface Ride {
  id: number;
  driver_id: number | null;
  passenger_id: number;
  status: RideStatus;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_address: string;
  passenger?: Passenger;
}

export interface LoginResponse {
  driver: Driver;
  access_token: string;
}

export interface SignUpResponse {
  driver: Driver;
}

export interface MessageErrorAPI {
  response?: { data?: { message?: string } };
}
