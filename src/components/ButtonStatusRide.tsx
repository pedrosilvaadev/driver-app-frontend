import { CheckCircle } from "lucide-react";

export const ButtonStatusRide = ({
  status,
  updateStatus,
  isUpdating,
}: {
  status: string;
  updateStatus: ({ status }: { status: "picked_up" | "dropped_off" }) => void;
  isUpdating: boolean;
}) => {
  console.log(status);
  const getActionButton = () => {
    if (status === "in_progress") {
      return (
        <button
          onClick={() => updateStatus({ status: "picked_up" })}
          disabled={isUpdating}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
        >
          {isUpdating ? "Updating..." : "Mark as Picked Up"}
        </button>
      );
    }

    if (status === "picked_up") {
      return (
        <button
          onClick={() => updateStatus({ status: "dropped_off" })}
          disabled={isUpdating}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
        >
          {isUpdating ? "Updating..." : "Mark as Dropped Off"}
        </button>
      );
    }

    if (status === "dropped_off") {
      return (
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="h-8 w-8" />
            <span className="text-xl font-medium">Trip Completed!</span>
          </div>
          <button
            onClick={() => (window.location.href = "/rides")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
          >
            Back to Rides
          </button>
        </div>
      );
    }

    return null;
  };

  return <>{getActionButton()}</>;
};
