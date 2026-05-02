import { useUser } from "@queries/user";
import { Navigate, Outlet } from "react-router-dom";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

type ProtectedLayoutProps = {
  roles?: Role[];
};

export default function ProtectedLayout({ roles }: ProtectedLayoutProps) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles?.includes(user?.role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <Outlet />;
}
