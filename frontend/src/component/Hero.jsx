import React, { useEffect, useState } from 'react';
import SafeImage from './SafeImage';
import { HERO_IMAGE, bookingOptions, scrollToId, prefillBooking } from './data';

const Hero = () => {
  const [ready, setReady] = useState(false);
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay) =>
    `transition-all duration-1000 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
  const d = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[70px] lg:pt-0 bg-sky-950 overflow-hidden">
      <SafeImage
        src={HERO_IMAGE}
        alt="Calm lake surrounded by mountains"
        label="Peace Travel"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/70 via-sky-950/40 to-sky-950/90"></div>

      <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 text-center text-white">
        <p style={d(0)} className={`${anim()} inline-block px-4 py-1.5 rounded-full border border-orange-300/40 bg-orange-400/10 text-xs font-bold tracking-[0.3em] uppercase text-orange-200 mb-6`}>
          Explore · Relax · Repeat
        </p>

        <h1 style={d(150)} className={`${anim()} text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05]`}>
          Find your <span className="text-orange-400">peace</span>,<br />
          one journey at a time
        </h1>

        <p style={d(300)} className={`${anim()} mt-6 text-lg text-sky-100/90 max-w-2xl mx-auto leading-relaxed`}>
          Calm getaways, curated packages and custom trips across India — planned with care so you can simply enjoy the moment.
        </p>

        {/* Quick trip planner */}
        <div
          style={d(450)}
          className={`${anim()} mt-10 mx-auto max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 flex flex-col sm:flex-row gap-3`}
        >
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 px-5 py-4 rounded-2xl bg-white text-sky-950 font-semibold outline-none"
          >
            <option value="">Where to?</option>
            {bookingOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <input
            type="date"
            min={today}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="flex-1 px-5 py-4 rounded-2xl bg-white text-sky-950 font-semibold outline-none"
          />
          <button
            onClick={() => prefillBooking({ destination, travelDate })}
            className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-extrabold transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/30"
          >
            Plan My Trip
          </button>
        </div>

        <div style={d(600)} className={`${anim()} mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-sky-100/80 font-semibold`}>
          <span>9 Destinations</span>
          <span>9 Ready Packages</span>
          <span>24/7 Support</span>
        </div>

        <button
          onClick={() => scrollToId('about')}
          className="mt-12 text-sky-200/70 hover:text-white text-xs uppercase tracking-[0.3em] animate-bounce"
        >
          Scroll ↓
        </button>
      </div>
    </section>
  );
};

export default Hero;
