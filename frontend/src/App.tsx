import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/screens/Home";
import Explore from "./components/screens/Explore";
import ProviderDetails from "./components/screens/ProviderDetails";
import Dashboard from "./components/screens/Dashboard";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import { User } from "./types";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route
              path="/provider/:id"
              element={<ProviderDetails currentUser={currentUser} />}
            />

            <Route
              path="/login"
              element={
                currentUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={
                currentUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                currentUser ? (
                  <Dashboard user={currentUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

