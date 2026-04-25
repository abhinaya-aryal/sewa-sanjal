import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@queries/user";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC = ({ children }: Props) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
