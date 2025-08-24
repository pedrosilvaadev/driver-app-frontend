import { LoginPage } from "@/pages/LoginPage";
import { NotFound } from "@/pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RidesPage } from "@/pages/RidesPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { ActiveRidePage } from "@/pages/ActiveRidePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/rides" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/rides"
        element={
          <ProtectedRoute>
            <RidesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/active-ride/:id"
        element={
          <ProtectedRoute>
            <ActiveRidePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
