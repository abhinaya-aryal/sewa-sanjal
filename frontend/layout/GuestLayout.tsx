import { useUser } from "@queries/user";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
