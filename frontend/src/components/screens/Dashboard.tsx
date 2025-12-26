import React, { useEffect, useState } from "react";
import { User, Booking, Role, BookingStatus, Service } from "../../types";
import { MockService } from "../../services/mockService";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useAuthStore } from "@/src/store/authStore";

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const user = useAuthStore((state) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providerServices, setProviderServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "UPCOMING" | "HISTORY" | "SERVICES"
  >("UPCOMING");

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: BookingStatus,
  ) => {
    // Optimistic update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
    );
    await MockService.updateBookingStatus(bookingId, newStatus);
  };

  const upcomingBookings = bookings.filter((b) =>
    [
      BookingStatus.PENDING,
      BookingStatus.ACCEPTED,
      BookingStatus.IN_PROGRESS,
    ].includes(b.status),
  );
  const pastBookings = bookings.filter((b) =>
    [
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
      BookingStatus.REJECTED,
    ].includes(b.status),
  );

  const displayBookings =
    activeTab === "UPCOMING" ? upcomingBookings : pastBookings;

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case BookingStatus.ACCEPTED:
        return "bg-blue-100 text-blue-800";
      case BookingStatus.IN_PROGRESS:
        return "bg-indigo-100 text-indigo-800";
      case BookingStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case BookingStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      case BookingStatus.REJECTED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Provider Analytics Data Mock
  const analyticsData = [
    { name: "Mon", earnings: 1200 },
    { name: "Tue", earnings: 2100 },
    { name: "Wed", earnings: 800 },
    { name: "Thu", earnings: 1600 },
    { name: "Fri", earnings: 2400 },
    { name: "Sat", earnings: 3200 },
    { name: "Sun", earnings: 2800 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-gray-800">{user?.name}</span>
          </p>
        </div>
        {user.role === Role.PROVIDER && (
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            Provider Account
          </span>
        )}
      </div>

      {/* Provider Stats Overview */}
      {user.role === Role.PROVIDER && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary-600" />{" "}
                Weekly Performance
              </h3>
              <select className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                    tickFormatter={(value) => `NPR ${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="earnings" fill="#0d9488" radius={[4, 4, 0, 0]}>
                    {analyticsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 5 ? "#0f766e" : "#14b8a6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <DollarSign size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    NPR 125,000
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Jobs Completed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6 overflow-hidden">
        <nav className="flex divide-x divide-gray-200">
          <button
            onClick={() => setActiveTab("UPCOMING")}
            className={`flex-1 py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 transition-colors ${activeTab === "UPCOMING" ? "text-primary-700 bg-primary-50 border-b-2 border-primary-500" : "text-gray-500"}`}
          >
            {user.role === Role.PROVIDER
              ? "Incoming & Active"
              : "Upcoming Bookings"}
          </button>
          <button
            onClick={() => setActiveTab("HISTORY")}
            className={`flex-1 py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 transition-colors ${activeTab === "HISTORY" ? "text-primary-700 bg-primary-50 border-b-2 border-primary-500" : "text-gray-500"}`}
          >
            Booking History
          </button>
          {user.role === Role.PROVIDER && (
            <button
              onClick={() => setActiveTab("SERVICES")}
              className={`flex-1 py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 transition-colors ${activeTab === "SERVICES" ? "text-primary-700 bg-primary-50 border-b-2 border-primary-500" : "text-gray-500"}`}
            >
              My Services
            </button>
          )}
        </nav>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : activeTab === "SERVICES" ? (
        /* Services Tab for Providers */
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 shadow-sm transition-colors">
              <Plus size={18} className="mr-2" /> Add New Service
            </button>
          </div>
          {providerServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providerServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-bold text-gray-900">{service.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="font-semibold text-primary-700">
                        NPR {service.price}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">
                        {service.durationMin} mins
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">
                You haven't listed any services yet.
              </p>
            </div>
          )}
        </div>
      ) : displayBookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <Calendar className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No bookings found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === "UPCOMING"
              ? "You don't have any upcoming bookings."
              : "You haven't completed any bookings yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {displayBookings.map((booking) => (
              <li
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="h-12 w-12 rounded-full object-cover border border-gray-200"
                          src={
                            user.role === Role.CUSTOMER
                              ? booking.provider?.user.avatarUrl
                              : booking.customer?.avatarUrl
                          }
                          alt=""
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${booking.status === BookingStatus.IN_PROGRESS ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-bold text-primary-900">
                          {user.role === Role.CUSTOMER
                            ? booking.provider?.user.name
                            : booking.customer?.name}
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          {booking.service?.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                      <p className="mt-1 text-sm text-gray-900 font-bold">
                        NPR {booking.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:flex sm:justify-between items-center">
                    <div className="sm:flex gap-6">
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar
                          size={16}
                          className="flex-shrink-0 mr-1.5 text-gray-400"
                        />
                        {new Date(booking.scheduledAt).toLocaleDateString(
                          undefined,
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                      <p className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                        <Clock
                          size={16}
                          className="flex-shrink-0 mr-1.5 text-gray-400"
                        />
                        {new Date(booking.scheduledAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Action Buttons for Provider */}
                    {user.role === Role.PROVIDER &&
                      booking.status === BookingStatus.PENDING && (
                        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                booking.id,
                                BookingStatus.ACCEPTED,
                              )
                            }
                            className="flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                          >
                            <CheckCircle size={14} className="mr-2" /> Accept
                            Request
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                booking.id,
                                BookingStatus.REJECTED,
                              )
                            }
                            className="flex items-center px-4 py-2 border border-gray-300 text-xs font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
                          >
                            <XCircle size={14} className="mr-2" /> Decline
                          </button>
                        </div>
                      )}

                    {/* Action Buttons for Customer (Cancel) */}
                    {user.role === Role.CUSTOMER &&
                      booking.status === BookingStatus.PENDING && (
                        <div className="mt-4 sm:mt-0">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                booking.id,
                                BookingStatus.CANCELLED,
                              )
                            }
                            className="text-xs text-red-600 hover:text-red-800 font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
