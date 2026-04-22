import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
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
import Register from "./components/screens/Register";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Login from "./pages/login";
import { useUser } from "./pages/login/_hook";

const App: React.FC = () => {
  const { data: user } = useUser();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route
              path="/provider/:id"
              element={<ProviderDetails currentUser={user} />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register onLoginSuccess={() => {}} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
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
