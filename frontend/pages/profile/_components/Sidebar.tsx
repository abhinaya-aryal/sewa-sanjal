import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-48">
      <div className="mb-6">
        <div className="space-y-1">
          <button
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors bg-primary-50 text-primary-700 font-medium hover:bg-gray-50 cursor-pointer`}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors bg-primary-50 text-primary-700 font-medium hover:bg-gray-50 cursor-pointer`}
            onClick={() => navigate("/profile/services")}
          >
            Services
          </button>
        </div>
      </div>
    </div>
  );
}
