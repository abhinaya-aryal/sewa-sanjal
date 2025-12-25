import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Briefcase,
  Mail,
  Lock,
  User,
  AlertCircle,
  Check,
} from "lucide-react";
import { MockService } from "../../services/mockService";
import { Role, User as UserType } from "../../types";

interface RegisterProps {
  onLoginSuccess: (user: UserType) => void;
}

const Register: React.FC<RegisterProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(Role.CUSTOMER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const user = await MockService.register(name, email, password, role);
      onLoginSuccess(user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-600">
            Sewa<span className="text-secondary-900">Sanjal</span>
          </h2>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              onClick={() => setRole(Role.CUSTOMER)}
              className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center text-center transition-all ${role === Role.CUSTOMER ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
            >
              <UserIcon
                size={24}
                className={
                  role === Role.CUSTOMER ? "text-primary-600" : "text-gray-400"
                }
              />
              <span
                className={`mt-2 text-sm font-medium ${role === Role.CUSTOMER ? "text-primary-900" : "text-gray-900"}`}
              >
                Customer
              </span>
              <span className="text-xs text-gray-500 mt-1">
                I want to book services
              </span>
            </div>

            <div
              onClick={() => setRole(Role.PROVIDER)}
              className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center text-center transition-all ${role === Role.PROVIDER ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
            >
              <Briefcase
                size={24}
                className={
                  role === Role.PROVIDER ? "text-primary-600" : "text-gray-400"
                }
              />
              <span
                className={`mt-2 text-sm font-medium ${role === Role.PROVIDER ? "text-primary-900" : "text-gray-900"}`}
              >
                Provider
              </span>
              <span className="text-xs text-gray-500 mt-1">
                I want to offer services
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start text-sm">
              <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                />
              </div>
            </div>

            {role === Role.PROVIDER && (
              <div className="bg-blue-50 p-3 rounded-md flex items-start">
                <div className="flex-shrink-0">
                  <Check size={16} className="text-blue-600 mt-0.5" />
                </div>
                <p className="ml-2 text-sm text-blue-700">
                  By registering as a provider, you agree to our Service
                  Provider Terms. You will need to complete your profile before
                  accepting jobs.
                </p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Creating account..."
                  : role === Role.PROVIDER
                    ? "Register as Provider"
                    : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
