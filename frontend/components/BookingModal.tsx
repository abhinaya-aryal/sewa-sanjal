import React, { useState } from 'react';
import { X, Calendar, Clock, CreditCard, CheckCircle, ChevronRight, ChevronLeft, Wallet } from 'lucide-react';
import { Service, Provider } from '../types';
import { PAYMENT_METHODS } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  provider: Provider;
  onConfirm: (bookingDetails: { date: string; time: string; paymentMethod: string }) => void;
  isProcessing: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service, provider, onConfirm, isProcessing }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && date && time) setStep(2);
    else if (step === 2 && paymentMethod) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    onConfirm({ date, time, paymentMethod });
  };

  // Basic validation to ensure future dates
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-lg w-full">
          
          {/* Header */}
          <div className="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-lg font-bold text-gray-900">Book Service</h3>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-500"><X size={20} /></button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1.5">
             <div className="bg-primary-600 h-1.5 transition-all duration-300 ease-in-out" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>

          <div className="p-6">
             {/* Service Summary */}
             <div className="flex items-center p-3 mb-6 bg-primary-50 rounded-lg border border-primary-100">
                <div className="flex-1">
                   <h4 className="font-semibold text-primary-900">{service.title}</h4>
                   <p className="text-xs text-primary-700">by {provider.user.name}</p>
                </div>
                <div className="text-right">
                   <p className="font-bold text-primary-900">NPR {service.price}</p>
                   <p className="text-xs text-primary-700">{service.durationMin} mins</p>
                </div>
             </div>

             {/* Step 1: Date & Time */}
             {step === 1 && (
               <div className="space-y-4 animate-fadeIn">
                 <h4 className="font-medium text-gray-900 mb-2">Select Date & Time</h4>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                   <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                      <input
                        type="date"
                        min={today}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                   <div className="grid grid-cols-3 gap-2">
                     {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map(t => (
                       <button
                         key={t}
                         type="button"
                         onClick={() => setTime(t)}
                         className={`py-2 text-sm border rounded-md ${time === t ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold' : 'border-gray-300 hover:bg-gray-50'}`}
                       >
                         {t}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             )}

             {/* Step 2: Payment */}
             {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                   <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                   <div className="space-y-3">
                      {PAYMENT_METHODS.map(method => (
                        <div 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary-600 bg-primary-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`p-2 rounded-full mr-4 ${paymentMethod === method.id ? 'bg-primary-200 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                             {method.icon === 'Wallet' ? <Wallet size={20} /> : <CreditCard size={20} />}
                          </div>
                          <div>
                             <p className="font-medium text-gray-900">{method.name}</p>
                             <p className="text-xs text-gray-500">Secure transaction</p>
                          </div>
                          <div className="ml-auto">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === method.id ? 'border-primary-600' : 'border-gray-300'}`}>
                               {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-primary-600 rounded-full"></div>}
                            </div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             )}

             {/* Step 3: Review & Confirm */}
             {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                   <h4 className="font-medium text-gray-900 mb-2">Confirm Details</h4>
                   <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                      <div className="flex justify-between">
                         <span className="text-gray-500">Service</span>
                         <span className="font-medium text-gray-900">{service.title}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-gray-500">Date & Time</span>
                         <span className="font-medium text-gray-900">{date} at {time}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-gray-500">Payment</span>
                         <span className="font-medium text-gray-900 capitalize">{PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                         <span className="text-gray-900 font-bold">Total</span>
                         <span className="font-bold text-primary-600 text-lg">NPR {service.price}</span>
                      </div>
                   </div>
                </div>
             )}
          </div>

          {/* Footer Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
             {step > 1 ? (
               <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                 <ChevronLeft size={16} className="mr-1" /> Back
               </button>
             ) : (
               <div></div>
             )}
             
             {step < 3 ? (
               <button 
                 onClick={handleNext} 
                 disabled={step === 1 ? !date || !time : !paymentMethod}
                 className="flex items-center bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
               >
                 Next <ChevronRight size={16} className="ml-1" />
               </button>
             ) : (
               <button 
                 onClick={handleConfirm}
                 disabled={isProcessing}
                 className="flex items-center bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 disabled:opacity-50 shadow-sm transition-colors"
               >
                 {isProcessing ? 'Booking...' : 'Confirm Booking'} <CheckCircle size={16} className="ml-2" />
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;