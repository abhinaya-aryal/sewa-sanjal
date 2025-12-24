import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { MOCK_PROVIDERS, CATEGORIES } from '../../constants';
import ProviderCard from '../ProviderCard';
import { useSearchParams } from 'react-router-dom';

const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState('all'); // all, low, medium, high

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const filteredProviders = useMemo(() => {
    let result = MOCK_PROVIDERS.filter(provider => {
      const matchesSearch = 
        provider.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || provider.categories.some(c => c.id === selectedCategory);
      
      const matchesLocation = locationFilter === '' || 
        provider.location.city.toLowerCase().includes(locationFilter.toLowerCase());

      const minPrice = Math.min(...provider.services.map(s => s.price));
      let matchesPrice = true;
      if (priceRange === 'low') matchesPrice = minPrice < 1000;
      else if (priceRange === 'medium') matchesPrice = minPrice >= 1000 && minPrice <= 3000;
      else if (priceRange === 'high') matchesPrice = minPrice > 3000;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    // Sorting
    if (sortBy === 'priceAsc') {
       result.sort((a, b) => Math.min(...a.services.map(s => s.price)) - Math.min(...b.services.map(s => s.price)));
    } else if (sortBy === 'priceDesc') {
       result.sort((a, b) => Math.min(...b.services.map(s => s.price)) - Math.min(...a.services.map(s => s.price)));
    } else if (sortBy === 'rating') {
       result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedCategory, locationFilter, sortBy, priceRange]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if(catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
             <h1 className="text-3xl font-bold text-gray-900">Explore Services</h1>
             <span className="text-sm text-gray-500 mt-1 md:mt-0">{filteredProviders.length} professionals available</span>
          </div>
          
          <div className="mt-2 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-5 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                placeholder="Search providers or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="md:col-span-3">
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">📍 All Locations</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>

             {/* Sort Filter */}
             <div className="md:col-span-2">
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="rating">Rating: High to Low</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
            
             {/* Category Filter (Mobile) */}
             <div className="md:hidden md:col-span-2">
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-48">
                
                {/* Categories */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                     <Filter size={18} className="text-gray-500 mr-2" />
                     <h3 className="font-semibold text-gray-900">Categories</h3>
                  </div>
                  <div className="space-y-1">
                     <button
                       onClick={() => handleCategoryChange('all')}
                       className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                       All Services
                     </button>
                     {CATEGORIES.map(cat => (
                       <button
                         key={cat.id}
                         onClick={() => handleCategoryChange(cat.id)}
                         className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                       >
                         {cat.name}
                       </button>
                     ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                   <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                   <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="price" checked={priceRange === 'all'} onChange={() => setPriceRange('all')} className="text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">Any Price</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="price" checked={priceRange === 'low'} onChange={() => setPriceRange('low')} className="text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">Under NPR 1,000</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="price" checked={priceRange === 'medium'} onChange={() => setPriceRange('medium')} className="text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">NPR 1,000 - 3,000</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="price" checked={priceRange === 'high'} onChange={() => setPriceRange('high')} className="text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">Above NPR 3,000</span>
                      </label>
                   </div>
                </div>
             </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
             {filteredProviders.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredProviders.map(provider => (
                   <ProviderCard key={provider.id} provider={provider} />
                 ))}
               </div>
             ) : (
               <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                  <Search className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No providers found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <button onClick={() => {setSearchTerm(''); setPriceRange('all'); setLocationFilter(''); setSelectedCategory('all')}} className="mt-4 text-primary-600 hover:underline">Clear all filters</button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;