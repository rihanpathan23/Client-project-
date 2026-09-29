import React, { useState } from 'react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { destinations, scrollToId } from './data';

const Destinations = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="destinations" className="py-24 bg-sky-950 text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-400 mb-3">Destinations</p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              Where will <span className="text-orange-400">peace</span> find you?
            </h2>
            <p className="mt-4 text-sky-200/80 text-lg">
              Hover or tap a place to explore it. Nine handpicked escapes across India.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-col md:flex-row gap-3 h-[900px] md:h-[560px]">
            {destinations.map((d, i) => {
              const on = i === active;
              return (
                <div
                  key={d.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-in-out ${
                    on ? 'flex-[7]' : 'flex-1'
                  }`}
                >
                  <SafeImage
                    src={d.image}
                    alt={d.name}
                    label={d.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                      on ? 'scale-100' : 'scale-125'
                    }`}
                  />
                  <div className={`absolute inset-0 transition-colors duration-700 ${
                    on ? 'bg-gradient-to-t from-sky-950/95 via-sky-950/20 to-transparent' : 'bg-sky-950/55'
                  }`}></div>

                  {/* Label when collapsed */}
                  <span
                    className={`absolute whitespace-nowrap font-extrabold tracking-wide text-white transition-opacity duration-500
                      left-5 top-1/2 -translate-y-1/2
                      md:left-1/2 md:top-auto md:bottom-6 md:-translate-x-1/2 md:translate-y-0
                      md:[writing-mode:vertical-rl] md:rotate-180 ${on ? 'opacity-0' : 'opacity-100'}`}
                  >
                    {d.name}
                  </span>

                  {/* Details when expanded */}
                  <div
                    className={`absolute bottom-0 inset-x-0 p-6 sm:p-8 transition-all duration-700 ${
                      on ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-6 pointer-events-none'
                    }`}
                  >
                    <div className="min-w-[240px]">
                      <span className="inline-block bg-orange-400 text-sky-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {d.tag}
                      </span>
                      <h3 className="mt-3 text-3xl sm:text-4xl font-black">{d.name}</h3>
                      <p className="mt-2 text-sky-100/90 max-w-md">{d.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToId('packages');
                        }}
                        className="mt-5 inline-flex items-center gap-2 bg-white text-sky-950 hover:bg-orange-400 font-bold px-6 py-2.5 rounded-full transition-colors duration-300"
                      >
                        View packages →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Destinations;
