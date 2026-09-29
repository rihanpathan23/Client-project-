import React, { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Destinations', id: 'destinations' },
  { name: 'Packages', id: 'packages' },
  { name: 'Booking', id: 'booking' },
  { name: 'Contact', id: 'contact' },
];

const LINK_H = 52; // height of each link row (px) used by the sliding pill

const Navbar = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // highlight the section currently on screen
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 200) {
        setActive('home');
        return;
      }
      let current = 'home';
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const offset = window.innerWidth < 1024 ? 70 : 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  };

  const activeIndex = Math.max(0, navLinks.findIndex((l) => l.id === active));

  // NOTE: this is a JSX element (not a component), so it is not re-mounted on
  // every scroll and the sliding pill animates smoothly.
  const sidebar = (
    <div className="flex flex-col h-full p-7">
      {/* Logo */}
      <button
        onClick={() => scrollToSection('home')}
        className={`flex items-center gap-3 text-left transition-all duration-700 ${
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 text-sky-950 font-black text-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          P
        </span>
        <span>
          <span className="block text-2xl font-black tracking-tight text-white leading-none">
            Peace <span className="text-orange-400">Travel</span>
          </span>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-sky-300/70 mt-1.5">
            Explore · Relax · Repeat
          </span>
        </span>
      </button>

      <div className="h-px bg-gradient-to-r from-orange-400/60 to-transparent my-8"></div>

      {/* Links with sliding pill */}
      <nav className="relative" style={{ height: navLinks.length * LINK_H }}>
        <span
          className="absolute left-0 w-full rounded-xl bg-orange-400/15 border border-orange-400/30 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ height: LINK_H - 6, transform: `translateY(${activeIndex * LINK_H}px)` }}
        >
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-orange-400"></span>
        </span>

        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{ height: LINK_H, transitionDelay: `${150 + i * 70}ms` }}
            className={`relative w-full flex items-center gap-4 px-5 text-left transition-all duration-700 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            } ${active === link.id ? 'text-orange-300' : 'text-sky-100/80 hover:text-white'}`}
          >
            <span className="text-xs font-mono opacity-60">0{i + 1}</span>
            <span className="font-semibold tracking-wide">{link.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div
        className={`mt-auto space-y-3 transition-all duration-700 delay-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <button
          onClick={() => scrollToSection('booking')}
          className="w-full bg-orange-400 hover:bg-orange-300 text-sky-950 font-extrabold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
        >
          Book Now
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            onAdminClick && onAdminClick();
          }}
          className="w-full text-sky-300/80 hover:text-white border border-sky-800 hover:border-sky-600 py-3 rounded-xl text-sm font-semibold transition-colors duration-300"
        >
          Admin Login
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-72 z-50 bg-sky-950 border-r border-sky-900">
        {sidebar}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-[70px] z-50 bg-sky-950/95 backdrop-blur border-b border-sky-900 flex items-center justify-between px-5">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-orange-400 text-sky-950 font-black flex items-center justify-center">P</span>
          <span className="text-xl font-black text-white">
            Peace <span className="text-orange-400">Travel</span>
          </span>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="w-11 h-11 rounded-xl bg-sky-900 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-0.5 w-5 bg-white rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-5 bg-white rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-5 bg-white rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-[70px] bottom-0 w-72 z-50 bg-sky-950 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </aside>
    </>
  );
};

export default Navbar;
