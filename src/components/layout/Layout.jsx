import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header + Navbar */}
      <Header />

      {/* Main content */}
      <main className="flex-grow bg-emerald-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
