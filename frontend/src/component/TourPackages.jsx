import React from 'react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { packages, prefillBooking } from './data';

const TourPackages = () => {
  const [spotlight, ...rest] = packages;

  return (
    <section id="packages" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-600 mb-3">Tour Packages</p>
            <h2 className="text-4xl sm:text-5xl font-black text-sky-950 leading-tight">
              Pick a package, <span className="text-orange-500">pack a bag</span>
            </h2>
            <p className="mt-4 text-sky-900/70 text-lg">
              Every package includes stay, transport and sightseeing — and can be customised to your plan.
            </p>
          </div>
        </Reveal>

        {/* Spotlight package */}
        <Reveal>
          <div className="group relative rounded-[2rem] overflow-hidden h-[420px] mb-10 shadow-xl">
            <SafeImage
              src={spotlight.image}
              alt={spotlight.title}
              label={spotlight.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-950/60 to-transparent"></div>

            <div className="relative h-full p-8 sm:p-12 flex flex-col justify-end max-w-xl text-white">
              <span className="self-start bg-orange-400 text-sky-950 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                ★ Most Loved
              </span>
              <p className="text-orange-300 font-bold uppercase tracking-wider text-sm">{spotlight.location}</p>
              <h3 className="text-3xl sm:text-4xl font-black mt-1">{spotlight.title}</h3>
              <p className="mt-3 text-sky-100/90">{spotlight.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-sky-300">Duration</p>
                  <p className="font-bold">{spotlight.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-sky-300">From</p>
                  <p className="text-3xl font-black text-orange-400">{spotlight.price}</p>
                </div>
                <button
                  onClick={() => prefillBooking({ destination: spotlight.dest })}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-extrabold px-8 py-3 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/30"
                >
                  Book This Trip
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((pkg, i) => (
            <Reveal key={pkg.id} delay={(i % 4) * 100}>
              <div className="group h-full flex flex-col bg-orange-50/60 rounded-3xl overflow-hidden border border-orange-100 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-44 overflow-hidden">
                  <SafeImage
                    src={pkg.image}
                    alt={pkg.title}
                    label={pkg.location}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <span className="absolute top-3 right-3 bg-sky-950 text-orange-300 text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
                    {pkg.price}
                  </span>
                  {pkg.featured && (
                    <span className="absolute top-3 left-3 bg-orange-400 text-sky-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">{pkg.location}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-sky-950 leading-snug">{pkg.title}</h3>
                  <p className="mt-2 text-sm text-sky-900/70 leading-relaxed line-clamp-2">{pkg.description}</p>

                  <div className="mt-auto pt-5">
                    <p className="text-xs font-semibold text-sky-900/60 mb-3">⏱ {pkg.duration}</p>
                    <button
                      onClick={() => prefillBooking({ destination: pkg.dest })}
                      className="w-full bg-sky-950 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl transition-colors duration-300"
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
