import React from 'react';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { Provider } from '../types';
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const minPrice = Math.min(...provider.services.map(s => s.price));

  return (
    <Link to={`/provider/${provider.id}`} className="group block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
             <div className="relative">
               <img 
                 src={provider.user.avatarUrl || 'https://picsum.photos/100/100'} 
                 alt={provider.user.name} 
                 className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
               />
               {provider.isVerified && (
                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" title="Verified Provider">
                   <BadgeCheck className="w-5 h-5 text-blue-500 fill-current" />
                 </div>
               )}
             </div>
             <div>
               <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{provider.user.name}</h3>
               <p className="text-sm text-gray-500 line-clamp-1">{provider.categories.map(c => c.name).join(', ')}</p>
               <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin size={12} className="mr-1" />
                  {provider.location.city}, {provider.location.district}
               </div>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700 text-xs font-bold">
               <Star size={12} className="fill-amber-400 text-amber-400 mr-1" />
               {provider.rating} <span className="font-normal text-amber-600 ml-1">({provider.reviewCount})</span>
             </div>
          </div>
        </div>
        
        <div className="mt-4">
           <p className="text-sm text-gray-600 line-clamp-2">{provider.bio}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Starts from</p>
            <p className="font-bold text-gray-900">NPR {minPrice}</p>
          </div>
          <span className="text-primary-600 text-sm font-medium group-hover:underline">View Profile &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;