import React from 'react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { scrollToId } from './data';

const stats = [
  { value: '9+', label: 'Destinations' },
  { value: '500+', label: 'Trips Planned' },
  { value: '24/7', label: 'Support' },
  { value: '100%', label: 'Custom Plans' },
];

const points = [
  { title: 'Stress-free planning', text: 'Tickets, stays, transport and sightseeing — we handle it all.' },
  { title: 'Honest pricing', text: 'Clear package costs with no hidden charges.' },
  { title: 'Local knowledge', text: 'Trusted guides and hand-picked stays at every destination.' },
];

const About = () => (
  <section id="about" className="relative py-24 bg-orange-50 overflow-hidden">
    <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl"></div>

    <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Collage */}
        <Reveal from="left">
          <div className="relative h-[480px] sm:h-[560px]">
            <SafeImage
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
              alt="Iconic Indian monument"
              label="Heritage"
              className="absolute top-0 left-0 w-3/5 h-3/5 object-cover rounded-[2rem] shadow-xl"
            />
            <SafeImage
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
              alt="Lake adventure"
              label="Adventure"
              className="absolute top-16 right-0 w-2/5 h-1/2 object-cover rounded-[2rem] shadow-xl border-4 border-orange-50"
            />
            <SafeImage
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
              alt="Peaceful beach"
              label="Relax"
              className="absolute bottom-0 left-1/4 w-3/5 h-2/5 object-cover rounded-[2rem] shadow-xl border-4 border-orange-50"
            />
            <div className="absolute bottom-6 left-0 bg-sky-950 text-white rounded-2xl px-6 py-4 shadow-2xl">
              <p className="text-3xl font-black text-orange-400">Peace</p>
              <p className="text-xs uppercase tracking-widest text-sky-200">of mind, always</p>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal from="right" delay={150}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-600 mb-3">About Peace Travel</p>
          <h2 className="text-4xl sm:text-5xl font-black text-sky-950 leading-tight">
            Travel that feels <span className="text-orange-500">calm</span>, not complicated
          </h2>
          <p className="mt-6 text-lg text-sky-900/75 leading-relaxed">
            Peace Travel is a tour and travel company built on one idea — a holiday should refresh you from the very first step.
            We design comfortable, well-paced trips to India&apos;s most beautiful places, from quiet beaches and green backwaters
            to snowy mountains and royal cities.
          </p>

          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-1 w-7 h-7 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-black">✓</span>
                <div>
                  <h4 className="font-extrabold text-sky-950">{p.title}</h4>
                  <p className="text-sky-900/70">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollToId('contact')}
            className="mt-10 bg-sky-950 hover:bg-orange-500 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            Talk to Our Team
          </button>
        </Reveal>
      </div>

      {/* Stats band */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-20 rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-xl">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className="text-center py-9 px-4">
              <p className="text-4xl font-black">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest font-bold text-orange-50/90">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
