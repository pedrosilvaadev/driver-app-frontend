import { io, Socket } from "socket.io-client";
import type { RideAcceptedEvent, RideStatusChangedEvent } from "./events";

type EventTypes = RideAcceptedEvent | RideStatusChangedEvent;
type EventHandler<T extends EventTypes = EventTypes> = (event: T) => void;

class RealtimeConnection {
  private socket: Socket | null = null;
  private handlers: EventHandler[] = [];
  private maxReconnectAttempts = 5;

  connect() {
    if (this.socket) return;

    const apiBase =
      (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

    this.socket = io(apiBase.replace(/\/+$/, ""), {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.registerListeners();
  }

  private registerListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("✅ Socket.IO connected");
    });

    this.socket.on("rideAccepted", (data) => {
      console.log("📥 Received rideAccepted:", data);
      this.notifyHandlers({ type: "rideAccepted", payload: data });
    });

    this.socket.on("rideUpdated", (data) => {
      console.log("📥 Received rideUpdated:", data);
      this.notifyHandlers({ type: "rideUpdated", payload: data });
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
    });

    this.socket.on("connect_error", (error) => {
      console.error("⚠️ Socket.IO error:", error.message);
    });
  }

  private notifyHandlers(event: EventTypes) {
    this.handlers.forEach((handler) => handler(event));
  }

  onEvent(handler: EventHandler) {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      console.log("🔌 Socket.IO connection closed");
    }
  }
}

export const realtimeConnection = new RealtimeConnection();
