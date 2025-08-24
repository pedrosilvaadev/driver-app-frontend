"use client";

import { MapPin, User } from "lucide-react";
import type { Ride } from "../types/domain";

interface RideCardProps {
  ride: Ride;
  onAccept: (rideId: number) => void;
  isAccepting: boolean;
}

export const RideCard = ({ ride, onAccept, isAccepting }: RideCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Pickup</p>
            <p className="text-sm text-gray-600">{ride.pickup_address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Dropoff</p>
            <p className="text-sm text-gray-600">{ride.dropoff_address}</p>
          </div>
        </div>

        {ride.passenger && (
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Passenger</p>
              <p className="text-sm text-gray-600">{ride.passenger.name}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => onAccept(ride.id)}
          disabled={isAccepting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isAccepting ? "Accepting..." : "Accept Ride"}
        </button>
      </div>
    </div>
  );
};
