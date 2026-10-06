import React, { useState, useEffect } from 'react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { bookingOptions } from './data';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  travelers: 1,
};

const inputCls =
  'w-full px-4 py-3.5 bg-sky-50 border border-sky-100 rounded-xl text-sky-950 placeholder-sky-900/40 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-300/50 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const labelCls =
  'block text-xs font-bold uppercase tracking-widest text-sky-900/70 mb-2';

const Booking = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  // Render backend URL
  const API_URL =
    import.meta.env.VITE_API_URL ||
    'https://client-project-backend-wnr2.onrender.com';

  // Pre-fill from Hero planner / package buttons
  useEffect(() => {
    const onPrefill = (e) => {
      const { destination, travelDate } = e.detail || {};

      setFormData((prev) => ({
        ...prev,
        destination: destination || prev.destination,
        travelDate: travelDate || prev.travelDate,
      }));
    };

    window.addEventListener('prefill-booking', onPrefill);

    return () => {
      window.removeEventListener('prefill-booking', onPrefill);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.destination ||
      !formData.travelDate ||
      !formData.travelers
    ) {
      setErrorMessage('Please fill in all required fields to proceed.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          destination: formData.destination,
          travel_date: formData.travelDate,
          guests: parseInt(formData.travelers, 10),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(
          'Booking successful! We have received your details and will contact you shortly.'
        );

        setFormData(initialForm);
      } else {
        setErrorMessage(
          data.message || 'Failed to create booking. Please try again.'
        );
      }
    } catch (error) {
      console.error('Booking error:', error);

      setErrorMessage(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative py-24 bg-gradient-to-b from-sky-100 to-orange-50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="grid md:grid-cols-5 rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-sky-900/10">

            {/* Image panel */}
            <div className="relative md:col-span-2 min-h-[320px] md:min-h-full">
              <SafeImage
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
                alt="Peaceful travel moment"
                label="Peace Travel"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/95 via-sky-950/50 to-sky-950/20"></div>

              <div className="relative h-full p-8 sm:p-10 flex flex-col justify-end text-white">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-300 mb-3">
                  Reserve Your Spot
                </p>

                <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                  Your peaceful journey starts here
                </h2>

                <ul className="mt-6 space-y-3 text-sky-100/90 text-sm">
                  {[
                    'Callback from our travel expert',
                    'Custom itinerary on request',
                    'No payment needed to enquire',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-400 text-sky-950 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>

                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-7 sm:p-10">
              <h3 className="text-2xl font-black text-sky-950 mb-6">
                Book Your Trip
              </h3>

              {errorMessage && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className={labelCls}
                    >
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      disabled={isLoading}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={labelCls}
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      disabled={isLoading}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className={labelCls}
                    >
                      Phone *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      disabled={isLoading}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="destination"
                      className={labelCls}
                    >
                      Destination *
                    </label>

                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputCls}
                    >
                      <option value="">Select destination</option>

                      {bookingOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="travelDate"
                      className={labelCls}
                    >
                      Travel Date *
                    </label>

                    <input
                      id="travelDate"
                      name="travelDate"
                      type="date"
                      min={today}
                      value={formData.travelDate}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="travelers"
                      className={labelCls}
                    >
                      Travelers *
                    </label>

                    <input
                      id="travelers"
                      name="travelers"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.travelers}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputCls}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-extrabold py-4 rounded-xl text-white transition-all duration-300 ${
                    isLoading
                      ? 'bg-orange-300 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-400 hover:-translate-y-0.5 shadow-lg shadow-orange-500/30'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>

              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Booking;