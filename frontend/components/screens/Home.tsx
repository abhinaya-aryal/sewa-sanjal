import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Shield, Clock, Award, UserCheck, CalendarCheck, Smile } from 'lucide-react';
import { CATEGORIES, MOCK_PROVIDERS } from '../../constants';
import ProviderCard from '../ProviderCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProviders = MOCK_PROVIDERS.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-primary-700 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Expert services for</span>{' '}
                  <span className="block text-primary-200 xl:inline">your every need</span>
                </h1>
                <p className="mt-3 text-base text-primary-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Find trusted plumbers, electricians, cleaners and more in your neighborhood. Verified professionals, transparent pricing, and secure bookings.
                </p>
                
                {/* Hero Search */}
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <form onSubmit={handleSearch} className="w-full sm:max-w-lg flex shadow-lg rounded-md overflow-hidden">
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 text-gray-700 focus:outline-none" 
                      placeholder="What service do you need today?" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="bg-secondary-900 text-white px-8 py-4 font-bold hover:bg-secondary-800 transition-colors flex items-center"
                    >
                      <Search size={20} className="mr-2" />
                      Search
                    </button>
                  </form>
                </div>
                
                <div className="mt-4 text-sm text-primary-200">
                  Popular: <span className="underline cursor-pointer" onClick={() => navigate('/explore?category=plumbing')}>Plumbing</span>, <span className="underline cursor-pointer" onClick={() => navigate('/explore?category=electrical')}>Wiring</span>, <span className="underline cursor-pointer" onClick={() => navigate('/explore?category=cleaning')}>Cleaning</span>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
            src="https://images.unsplash.com/photo-1581578731117-104f2a863a30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Person working"
          />
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Promise</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Sewa-Sanjal?
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Verified Providers</h3>
              <p className="mt-4 text-base text-gray-500">Every professional goes through a strict background check and skills assessment before joining our platform.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">On-Time Service</h3>
              <p className="mt-4 text-base text-gray-500">We value your time. Book a slot that works for you, and our professionals will arrive promptly.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Satisfaction Guaranteed</h3>
              <p className="mt-4 text-base text-gray-500">Not happy with the service? We have a dispute resolution team to ensure you get what you paid for.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-extrabold sm:text-4xl">How It Works</h2>
             <p className="mt-4 text-xl text-gray-400">Get your tasks done in 3 simple steps</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-700 z-0 transform -translate-y-1/2"></div>
             
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                 <Search size={40} className="text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">1. Search & Select</h3>
               <p className="text-gray-400">Browse through our list of verified professionals by category, price, or rating.</p>
             </div>
             
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                 <CalendarCheck size={40} className="text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">2. Book & Schedule</h3>
               <p className="text-gray-400">Choose a convenient time slot and book the service instantly with transparent pricing.</p>
             </div>
             
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center border-4 border-gray-900 mb-6 shadow-lg">
                 <Smile size={40} className="text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">3. Relax</h3>
               <p className="text-gray-400">Our professional arrives at your doorstep. Pay securely after the job is done.</p>
             </div>
           </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
               {CATEGORIES.map((cat) => (
                 <Link to={`/explore?category=${cat.id}`} key={cat.id} className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center border border-gray-100 transform hover:-translate-y-1">
                    <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                      {/* Icons placeholder logic - using a generic generic icon if dynamic import fails, but text labels work */}
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">{cat.name}</div>
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
               <h2 className="text-3xl font-extrabold text-gray-900">Top Rated Professionals</h2>
               <p className="mt-2 text-gray-500">Highly recommended by your neighbors.</p>
             </div>
             <Link to="/explore" className="text-primary-600 hover:text-primary-700 font-medium flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
             </Link>
           </div>
           
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProviders.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;