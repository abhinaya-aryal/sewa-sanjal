import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, BadgeCheck, Clock, ArrowLeft, Heart, MessageSquare, ThumbsUp } from 'lucide-react';
import { MockService } from '../../services/mockService';
import { Provider, Service, User, Review } from '../../types';
import BookingModal from '../BookingModal';

interface ProviderDetailsProps {
  currentUser: User | null;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({ currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      if (id) {
        const data = await MockService.getProviderById(id);
        const reviewsData = await MockService.getReviewsForProvider(id);
        const favStatus = MockService.isFavorite(id);
        
        setProvider(data || null);
        setReviews(reviewsData);
        setIsFavorite(favStatus);
        setIsLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  const toggleFavorite = async () => {
    if (provider) {
       const newStatus = await MockService.toggleFavorite(provider.id);
       setIsFavorite(newStatus);
    }
  };

  const handleBookClick = (service: Service) => {
    if (!currentUser) {
      alert("Please login to book a service");
      return;
    }
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (details: { date: string; time: string; paymentMethod: string }) => {
    setIsProcessing(true);
    if (provider && selectedService && currentUser) {
      const scheduledAt = new Date(`${details.date}T${details.time}`).toISOString();
      await MockService.createBooking({
        customerId: currentUser.id,
        providerId: provider.id,
        serviceId: selectedService.id,
        scheduledAt,
        price: selectedService.price,
        durationMin: selectedService.durationMin
      });
      setTimeout(() => {
         setIsProcessing(false);
         setIsModalOpen(false);
         navigate('/dashboard');
      }, 1000); // Simulate processing time
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  if (!provider) return <div className="p-8 text-center">Provider not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header/Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
             <ArrowLeft size={16} className="mr-1" /> Back to Search
           </button>
           
           <div className="flex flex-col md:flex-row items-start justify-between gap-6">
             <div className="flex flex-col md:flex-row items-start gap-6">
                <img 
                  src={provider.user.avatarUrl} 
                  alt={provider.user.name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">{provider.user.name}</h1>
                    {provider.isVerified && <BadgeCheck className="text-blue-500 w-6 h-6 fill-blue-50" />}
                  </div>
                  <p className="text-gray-500 mt-2 flex items-center">
                    <MapPin size={16} className="mr-1 text-gray-400" /> {provider.location.address}, {provider.location.city}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full text-amber-700 font-bold text-sm border border-amber-100">
                      <Star size={16} className="fill-amber-400 text-amber-400 mr-1.5" />
                      {provider.rating} <span className="text-amber-600 ml-1 font-normal">({provider.reviewCount} Reviews)</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">{provider.categories[0].name} Specialist</span>
                  </div>
                </div>
             </div>
             
             <div className="flex gap-3">
               <button 
                 onClick={toggleFavorite}
                 className={`p-3 rounded-full border transition-all ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200'}`}
                 title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
               >
                 <Heart size={20} className={isFavorite ? "fill-current" : ""} />
               </button>
               <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 shadow-sm transition-colors">
                 Contact Provider
               </button>
             </div>
           </div>
           
           {/* Tabs */}
           <div className="flex space-x-8 mt-12 border-b border-gray-200">
              {['services', 'reviews', 'about'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 px-2 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
           
           {activeTab === 'services' && (
             <div className="space-y-4 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Available Services</h2>
                {provider.services.map(service => (
                 <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-700">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      <div className="flex items-center mt-3 text-xs text-gray-500 bg-gray-50 inline-flex px-2 py-1 rounded">
                        <Clock size={12} className="mr-1" /> {service.durationMin} mins duration
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 min-w-[120px]">
                      <span className="font-bold text-gray-900 text-xl">NPR {service.price}</span>
                      <button 
                        onClick={() => handleBookClick(service)}
                        className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto"
                      >
                        Book Now
                      </button>
                    </div>
                 </div>
               ))}
             </div>
           )}

           {activeTab === 'reviews' && (
             <div className="animate-fadeIn">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
                 <button className="text-primary-600 text-sm font-medium hover:underline">Write a Review</button>
               </div>
               
               {reviews.length > 0 ? (
                 <div className="space-y-4">
                   {reviews.map(review => (
                     <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
                       <div className="flex items-start justify-between">
                         <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                               {review.authorName.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-bold text-gray-900">{review.authorName}</p>
                              <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="flex bg-amber-50 px-2 py-1 rounded">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                           ))}
                         </div>
                       </div>
                       <p className="mt-4 text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                   <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                   <p className="mt-2 text-gray-500">No reviews yet.</p>
                 </div>
               )}
             </div>
           )}

           {activeTab === 'about' && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {provider.user.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{provider.bio}</p>
                
                <h3 className="font-bold text-gray-900 mb-3">Service Areas</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                   <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{provider.location.city}</span>
                   <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{provider.location.district}</span>
                   <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{provider.location.address}</span>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar: Summary */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Why choose this pro?</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start">
                   <div className="bg-green-100 p-1 rounded-full mr-3 text-green-600"><BadgeCheck size={16} /></div>
                   <span><strong>Verified Background:</strong> We have checked their identity and criminal record.</span>
                </li>
                <li className="flex items-start">
                   <div className="bg-blue-100 p-1 rounded-full mr-3 text-blue-600"><ThumbsUp size={16} /></div>
                   <span><strong>{provider.reviewCount}+ Jobs Completed:</strong> Highly experienced in their field.</span>
                </li>
                <li className="flex items-start">
                   <div className="bg-purple-100 p-1 rounded-full mr-3 text-purple-600"><Star size={16} /></div>
                   <span><strong>High Rating:</strong> Maintained a {provider.rating} star average.</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <p className="text-xs text-gray-500 mb-2">Member since {new Date().getFullYear()}</p>
                 <button className="w-full text-center text-primary-600 text-sm font-medium hover:underline">Report this profile</button>
              </div>
           </div>
        </div>
      </div>

      {selectedService && (
        <BookingModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
          provider={provider}
          onConfirm={handleConfirmBooking}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default ProviderDetails;