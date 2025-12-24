import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/screens/Home';
import Explore from './components/screens/Explore';
import ProviderDetails from './components/screens/ProviderDetails';
import Dashboard from './components/screens/Dashboard';
import { MockService } from './services/mockService';
import { User, Role } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async () => {
    // Simple toggle for demo purposes
    // First click: Customer, Second Click: Provider
    if (!currentUser) {
      const user = await MockService.login('CUSTOMER');
      setCurrentUser(user);
    } else if (currentUser.role === Role.CUSTOMER) {
       const user = await MockService.login('PROVIDER');
       setCurrentUser(user);
    } else {
      setCurrentUser(null); // Should go to logout usually
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Dedicated function for specific role login for the Navbar buttons (if we had separate buttons)
  // For now, the Navbar just calls handleLogin which toggles through states or logs in a default user.
  // Let's make it smarter for the demo.
  
  const demoLogin = async () => {
     // If logged out, log in as Customer
     if (!currentUser) {
       const user = await MockService.login('CUSTOMER');
       setCurrentUser(user);
     }
  };
  
  // Easter egg: Double click login in navbar to switch roles? 
  // Better: Add a floating action button for demo controls
  
  const switchRole = async () => {
    if (!currentUser) return;
    const newRole = currentUser.role === Role.CUSTOMER ? 'PROVIDER' : 'CUSTOMER';
    const user = await MockService.login(newRole);
    setCurrentUser(user);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          currentUser={currentUser} 
          onLogin={demoLogin} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/provider/:id" element={<ProviderDetails currentUser={currentUser} />} />
            <Route 
              path="/dashboard" 
              element={
                currentUser ? <Dashboard user={currentUser} /> : <Navigate to="/" replace />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Demo Control - Floating Button to switch roles if logged in */}
        {currentUser && (
          <div className="fixed bottom-6 right-6 z-50">
             <button 
               onClick={switchRole}
               className="bg-secondary-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-secondary-800 text-sm font-medium transition-all transform hover:scale-105"
               title="Switch between Customer and Provider View"
             >
               Switch to {currentUser.role === Role.CUSTOMER ? 'Provider' : 'Customer'} View
             </button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;