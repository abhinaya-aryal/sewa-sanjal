import React, { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC = ({ children }: Props) => {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
