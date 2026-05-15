import Footer from "@components/Footer";
import Navbar from "@layout/_components/Navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
