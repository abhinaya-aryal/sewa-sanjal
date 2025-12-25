import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Star,
  CalendarCheck,
  Smile,
} from "lucide-react";
import { CATEGORIES, MOCK_PROVIDERS } from "../../constants";
import ProviderCard from "../ProviderCard";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProviders = MOCK_PROVIDERS.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Modern Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-100 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wide mb-6">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  #1 Service Marketplace in Nepal
                </div>

                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                  <span className="block xl:inline">Expert services for</span>{" "}
                  <span className="block text-primary-600 xl:inline">
                    your everyday needs
                  </span>
                </h1>

                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  From leaking taps to full home cleaning, connect with verified
                  professionals in minutes. Safe, reliable, and transparent.
                </p>

                {/* Enhanced Search */}
                <div className="mt-8 sm:mt-10">
                  <form
                    onSubmit={handleSearch}
                    className="relative group max-w-lg sm:mx-auto lg:mx-0"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center bg-white rounded-lg p-2 shadow-xl border border-gray-100">
                      <div className="flex-grow flex items-center px-4">
                        <Search className="text-gray-400 mr-3" size={24} />
                        <input
                          type="text"
                          className="w-full py-3 text-gray-700 text-lg focus:outline-none placeholder-gray-400 bg-transparent"
                          placeholder="What do you need help with?"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-md font-semibold text-lg hover:bg-primary-700 transition-colors shadow-md"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>

                {/* Popular Tags */}
                <div className="mt-6 flex flex-wrap gap-2 items-center sm:justify-center lg:justify-start">
                  <span className="text-sm text-gray-500 mr-2">Trending:</span>
                  {["Plumbing", "Cleaning", "Beauty", "Electrician"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => navigate(`/explore?search=${tag}`)}
                        className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>

                {/* Stats / Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-6 sm:justify-center lg:justify-start text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Verified Professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-blue-500" />
                    <span>Insured Work</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Right Side Visuals */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1758272421751-963195322eaa?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professional working"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent lg:via-white/10"></div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 right-12 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-white/50 animate-float hidden lg:block max-w-xs transform hover:scale-105 transition-transform cursor-default">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">100% Secure</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Every booking is insured and professionals are vetted.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/3 left-12 bg-white p-3 rounded-lg shadow-xl border border-gray-100 animate-float-delayed hidden lg:block transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/id/1027/50/50"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  alt="User"
                />
                <div>
                  <div className="flex text-amber-400 mb-0.5">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <p className="text-xs font-bold text-gray-700">
                    "Amazing service!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              Our Promise
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Sewa-Sanjal?
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Verified Providers
              </h3>
              <p className="mt-4 text-base text-gray-500">
                Every professional goes through a strict background check and
                skills assessment before joining our platform.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                On-Time Service
              </h3>
              <p className="mt-4 text-base text-gray-500">
                We value your time. Book a slot that works for you, and our
                professionals will arrive promptly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Satisfaction Guaranteed
              </h3>
              <p className="mt-4 text-base text-gray-500">
                Not happy with the service? We have a dispute resolution team to
                ensure you get what you paid for.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Get your tasks done in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-700 z-0 transform -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                <Search size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Search & Select</h3>
              <p className="text-gray-400">
                Browse through our list of verified professionals by category,
                price, or rating.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                <CalendarCheck size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Book & Schedule</h3>
              <p className="text-gray-400">
                Choose a convenient time slot and book the service instantly
                with transparent pricing.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                <Smile size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Relax</h3>
              <p className="text-gray-400">
                Our professional arrives at your doorstep. Pay securely after
                the job is done.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/explore?category=${cat.id}`}
                key={cat.id}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                  {/* Icons placeholder logic - using a generic generic icon if dynamic import fails, but text labels work */}
                  <span className="text-2xl">🛠️</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Providers */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Top Rated Professionals
              </h2>
              <p className="mt-2 text-gray-500">
                Highly recommended by your neighbors.
              </p>
            </div>
            <Link
              to="/explore"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center hover:underline"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

