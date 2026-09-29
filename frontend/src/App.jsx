import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import About from './component/About';
import Destinations from './component/Destinations';
import TourPackages from './component/TourPackages';
import Booking from './component/Booking';
import Contact from './component/Contact';
import Admin from './component/Admin';

function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-orange-50 font-sans antialiased">
      {/* Left sidebar navigation */}
      <Navbar onAdminClick={() => setAdminOpen(true)} />

      {/* Content is pushed right on desktop so the sidebar never covers it */}
      <main className="lg:pl-72 overflow-x-hidden">
        <Hero />
        <About />
        <Destinations />
        <TourPackages />
        <Booking />
        <Contact />

        <footer className="bg-sky-950 text-sky-300/70 text-sm text-center py-6">
          © {new Date().getFullYear()} Peace Travel. All rights reserved.
        </footer>
      </main>

      <Admin open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}

export default App;
