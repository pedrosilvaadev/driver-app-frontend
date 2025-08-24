export const getStatusText = (status: string) => {
  switch (status) {
    case "in_progress":
      return "En route to pickup";
    case "picked_up":
      return "Passenger picked up";
    case "dropped_off":
      return "Trip completed";
    default:
      return "Unknown status";
  }
};
