# URIDE Driver App – Fullstack

This repository contains the **Driver App MVP** for the URIDE. The solution is built with a **NestJS backend** and a **React frontend** using modern state management and real-time updates.

---

## 🚗 Features

- **Authentication:** Drivers can sign up and log in (JWT-based).
- **Rides Page:** Lists available ride requests with pickup/dropoff info and rider name.
- **Accept Ride:** Drivers can accept a ride, which is then marked as "In Progress" and removed from other drivers' lists in real time.
- **Active Ride Screen:** Shows ride details and allows status updates (Picked Up → Dropped Off).
- **Real-Time Updates:** UI updates instantly for all connected drivers using Socket.IO.
- **Feedback:** User actions trigger toast notifications for success/error feedback.
- **State Management:** Uses React Query for data fetching/caching and Zustand for auth state.

---

## 🏗️ Project Structure

```
src/
  api/           # API client and endpoints
  assets/        # Static assets
  components/    # UI components (Header, Loader, RideCard, etc)
  hooks/         # Custom React hooks (useRides, useActiveRide, useSignUp, etc)
  lib/           # Utility functions
  pages/         # Page components (RidesPage, ActiveRidePage, etc)
  realtime/      # Socket.IO connection and event types
  routes/        # App routing and protected routes
  store/         # Zustand store for authentication
  types/         # TypeScript domain models
  utils/         # Miscellaneous utilities
  App.tsx        # App root
  main.tsx       # Entry point
```

---

## ⚙️ Technologies Used

- **Frontend:** React, TypeScript, React Router, React Query, Zustand, Socket.IO Client, Sonner (toast notifications), Vite
- **Backend:** NestJS, Prisma, Socket.IO, JWT Auth (not included in this repo)
- **Styling:** Tailwind CSS (assumed from class usage)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Backend service running

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd driver-app-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file with:
     ```
     VITE_API_URL=http://localhost:3000
     ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Access the app:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 Key Design Decisions

- **React Query** is used for all data fetching and caching, ensuring UI stays in sync with backend and real-time events.
- **Socket.IO** provides real-time updates for ride acceptance and status changes, ensuring all drivers see up-to-date ride lists.
- **Zustand** manages authentication state for simplicity and performance.
- **Sonner** is used for user feedback via toast notifications.
- **Componentization:** UI is split into reusable components for maintainability.
- **TypeScript** is used throughout for type safety.

---

## 📝 How Real-Time Works

- When a driver accepts a ride or updates its status, the backend emits a Socket.IO event (`rideAccepted`, `rideUpdated`).
- All connected clients receive the event and update their UI instantly.
- The frontend listens for these events in both the Rides and Active Ride pages.

---

## 🧪 Testing

- The project is structured for easy addition of unit and integration tests.
- (Tests not included due to time constraints, but hooks/components are easily testable.)

---

## 🚦 Possible Improvements

- **Passenger Management:** Add UI and API endpoints for creating and managing passengers.
- **Ride Creation:** Allow creation of new rides from the frontend (for admin or test purposes).
- **Driver Profile:** Add a profile page for drivers to view/update their info and stats.
- **Passenger App:** Build a separate frontend for passengers to request rides and track status.
- **Better Error Handling:** Improve error boundaries and display more detailed error messages.
- **Optimistic UI:** Use optimistic updates for ride acceptance/status changes.
- **Unit & Integration Tests:** Add tests for hooks, components, and API logic.
- **Role-based Auth:** Support different user roles (driver, passenger, admin).
- **Map Integration:** Show pickup/dropoff locations on a map (e.g., Google Maps, Mapbox).
- **Mobile Responsiveness:** Improve mobile UI/UX.
- **Accessibility:** Enhance accessibility for all users.
- **Deployment:** Add Docker and CI/CD for production deployment.

---

## 📄 Design Trade-offs

- **Single Auth Store:** Zustand is used for simplicity; for larger apps, Context or Redux might be preferred.
- **Socket.IO Only:** Real-time is handled only via Socket.IO for simplicity; could be extended to support SSE or polling as fallback.
- **Minimal Styling:** Focused on functionality over advanced UI/UX due to challenge scope.

---
