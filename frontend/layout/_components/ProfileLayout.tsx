import Sidebar from "@pages/profile/_components/Sidebar";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row gap-8">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
