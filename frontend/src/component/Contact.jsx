import React, { useState } from 'react';
import Reveal from './Reveal';

const WHATSAPP_NUMBER = '919322188177'; // country code + number, no spaces
const DISPLAY_NUMBER = '+91 93221 88177';

const inputCls =
  'w-full px-5 py-3.5 bg-sky-50 border border-sky-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-300/60 focus:border-orange-400 outline-none transition-all duration-200';

const info = [
  { label: 'Office', value: 'Maharashtra, India', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Phone', value: DISPLAY_NUMBER, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { label: 'Email', value: 'contact@peacetravel.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    // Simulated submission (connect to your backend here if needed)
    setStatus({ type: 'success', message: 'Thank you! Your inquiry has been sent. We will get back to you soon.' });
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-orange-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-600 mb-3">Get in Touch</p>
            <h2 className="text-4xl sm:text-5xl font-black text-sky-950 leading-tight">
              Let&apos;s plan your <span className="text-orange-500">peaceful escape</span>
            </h2>
            <p className="mt-4 text-sky-900/70 text-lg">
              Questions about a package or need a custom itinerary? Message us anytime.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form (left) */}
          <Reveal from="left" className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-sky-900/5 border border-sky-100">
              <h3 className="text-2xl font-extrabold text-sky-950 mb-7">Send us an Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-sky-900 mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-sky-900 mb-2">Phone</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-sky-900 mb-2">Email *</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-sky-900 mb-2">Message *</label>
                  <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us about your dream destination..." className={`${inputCls} resize-none`}></textarea>
                </div>

                {status.type === 'error' && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100">{status.message}</div>
                )}
                {status.type === 'success' && (
                  <div className="text-green-700 text-sm font-medium bg-green-50 p-4 rounded-xl border border-green-100">{status.message}</div>
                )}

                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-400 text-white font-extrabold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-orange-500/30">
                  Send Inquiry
                </button>
              </form>
            </div>
          </Reveal>

          {/* Info (right) */}
          <Reveal from="right" delay={150} className="lg:col-span-2">
            <div className="bg-sky-950 rounded-3xl p-8 text-white h-full flex flex-col">
              <h3 className="text-2xl font-extrabold mb-8">Contact Information</h3>
              <div className="space-y-6">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-400/15 text-orange-300 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-sky-300/70 font-bold">{item.label}</p>
                      <p className="font-semibold mt-0.5 break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 lg:mt-auto flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-extrabold py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-green-500/20"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
