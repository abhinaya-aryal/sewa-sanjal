import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">Sewa<span className="text-white">Sanjal</span></h3>
            <p className="text-gray-400 text-sm">
              Connecting you with the best service professionals in Nepal. Reliable, fast, and secure.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary-400">Plumbing</a></li>
              <li><a href="#" className="hover:text-primary-400">Electrical</a></li>
              <li><a href="#" className="hover:text-primary-400">Home Cleaning</a></li>
              <li><a href="#" className="hover:text-primary-400">Painting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center"><MapPin size={16} className="mr-2"/> Kathmandu, Nepal</li>
              <li className="flex items-center"><Phone size={16} className="mr-2"/> +977 9800000000</li>
              <li className="flex items-center"><Mail size={16} className="mr-2"/> support@sewasanjal.com</li>
            </ul>
          </div>

          <div>
             <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
             <div className="flex space-x-4">
               <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
               <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
               <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
             </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sewa-Sanjal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;