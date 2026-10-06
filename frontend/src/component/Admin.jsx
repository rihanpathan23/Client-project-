import React, { useState, useEffect, useCallback } from 'react';

const ADMIN_ID = 'admin23';
const ADMIN_PASS = '93221';
const API_URL = `${import.meta.env.VITE_API_URL}/api/bookings`;

const Admin = ({ open, onClose }) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('tg_admin') === 'yes');
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');

  // lock page scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data.bookings || [];
      setBookings(list);
    } catch (err) {
      setFetchError('Could not load bookings. Make sure the backend is running and has a GET /api/bookings route.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open && loggedIn) loadBookings();
  }, [open, loggedIn, loadBookings]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (id.trim() === ADMIN_ID && pass === ADMIN_PASS) {
      sessionStorage.setItem('tg_admin', 'yes');
      setLoggedIn(true);
      setError('');
      setId('');
      setPass('');
    } else {
      setError('Invalid ID or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tg_admin');
    setLoggedIn(false);
    setBookings([]);
  };

  const filtered = bookings.filter((b) =>
    [b.full_name, b.email, b.phone, b.destination]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalGuests = bookings.reduce((sum, b) => sum + (Number(b.guests) || 0), 0);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div
        className={`absolute inset-0 flex items-center justify-center p-4 pointer-events-none transition-transform duration-500 ${
          open ? 'scale-100' : 'scale-95'
        }`}
      >
        {!loggedIn ? (
          /* LOGIN */
          <form
            onSubmit={handleLogin}
            className="pointer-events-auto w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">Admin Login</h2>
                <p className="text-slate-400 text-sm mt-1">Sign in to manage bookings</p>
              </div>
              <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
            </div>

            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2">Admin ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full mb-4 px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
              placeholder="Enter admin ID"
              autoComplete="username"
            />
            <label className="block text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full mb-4 px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
              placeholder="Enter password"
              autoComplete="current-password"
            />

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-extrabold py-3.5 rounded-xl transition-colors">
              Login
            </button>
          </form>
        ) : (
          /* DASHBOARD */
          <div className="pointer-events-auto w-full max-w-5xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-black text-white">Admin Dashboard</h2>
                <p className="text-slate-400 text-sm">Customer booking requests</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={loadBookings} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold">Refresh</button>
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-semibold">Logout</button>
                <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none px-2">×</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6 pb-0">
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Bookings</p>
                <p className="text-3xl font-black text-emerald-400 mt-1">{bookings.length}</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Travelers</p>
                <p className="text-3xl font-black text-amber-300 mt-1">{totalGuests}</p>
              </div>
            </div>

            <div className="p-6 pb-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone or destination..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex-1 overflow-auto px-6 pb-6">
              {loading && <p className="text-slate-400 py-8 text-center">Loading bookings...</p>}
              {fetchError && <p className="text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm">{fetchError}</p>}
              {!loading && !fetchError && filtered.length === 0 && (
                <p className="text-slate-500 py-8 text-center">No bookings found.</p>
              )}

              {!loading && filtered.length > 0 && (
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-400 uppercase text-xs tracking-wider sticky top-0 bg-slate-900">
                    <tr>
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Contact</th>
                      <th className="py-3 pr-4">Destination</th>
                      <th className="py-3 pr-4">Date</th>
                      <th className="py-3">Guests</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    {filtered.map((b, i) => (
                      <tr key={b.id || i} className="border-t border-slate-800 hover:bg-slate-800/50">
                        <td className="py-3 pr-4 font-semibold">{b.full_name}</td>
                        <td className="py-3 pr-4">
                          <div>{b.phone}</div>
                          <div className="text-slate-400 text-xs">{b.email}</div>
                        </td>
                        <td className="py-3 pr-4 text-emerald-300 font-semibold">{b.destination}</td>
                        <td className="py-3 pr-4">{b.travel_date ? String(b.travel_date).slice(0, 10) : '-'}</td>
                        <td className="py-3">{b.guests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
