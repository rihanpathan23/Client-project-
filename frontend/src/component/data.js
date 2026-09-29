
// Shared data + helpers used by Hero, Destinations, TourPackages and Booking.
const IMG = (id, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
 
export const HERO_IMAGE = IMG('photo-1501785888041-af3ef285b470', 2000);
 
export const bookingOptions = [
  'Goa', 'Manali', 'Kerala', 'Rajasthan', 'Kashmir',
  'Andaman', 'Darjeeling', 'Leh-Ladakh', 'Meghalaya',
];
 
export const destinations = [
  { id: 1, name: 'Goa', dest: 'Goa', tag: 'Sun & Sand', description: 'Golden beaches, beach shacks, water sports and Portuguese-era charm.', image: IMG('photo-1519046904884-53103b34b206') },
  { id: 2, name: 'Manali', dest: 'Manali', tag: 'Snow Peaks', description: 'Pine valleys, snow trails and Himalayan adventure sports.', image: IMG('photo-1464822759023-fed622ff2c3b') },
  { id: 3, name: 'Kerala', dest: 'Kerala', tag: 'Backwaters', description: 'Houseboats, spice hills and calm green landscapes.', image: IMG('photo-1441974231531-c6227db76b6e') },
  { id: 4, name: 'Jaipur', dest: 'Rajasthan', tag: 'Pink City', description: 'Royal forts, palaces and colourful bazaars.', image: IMG('photo-1477587458883-47145ed94245') },
  { id: 5, name: 'Kashmir', dest: 'Kashmir', tag: 'Paradise', description: 'Dal Lake shikara rides, meadows and snowy ranges.', image: IMG('photo-1506905925346-21bda4d32df4') },
  { id: 6, name: 'Udaipur', dest: 'Rajasthan', tag: 'City of Lakes', description: 'Lakeside palaces, boat rides and golden sunsets.', image: IMG('photo-1548013146-72479768bada') },
  { id: 7, name: 'Andaman', dest: 'Andaman', tag: 'Island Escape', description: 'Clear blue sea, coral reefs, snorkelling and white sand.', image: IMG('photo-1544551763-46a013bb70d5') },
  { id: 8, name: 'Darjeeling', dest: 'Darjeeling', tag: 'Tea Hills', description: 'Kanchenjunga sunrise, toy train and misty tea estates.', image: IMG('photo-1433838552652-f9a46b332c40') },
  { id: 9, name: 'Leh Ladakh', dest: 'Leh-Ladakh', tag: 'High Altitude', description: 'Rugged passes, blue lakes and ancient monasteries.', image: IMG('photo-1500530855697-b586d89ba3ee') },
];
 
export const packages = [
  { id: 1, title: 'Magical Manali Adventure', location: 'Himachal Pradesh', dest: 'Manali', description: 'Snow peaks, pine forests and thrilling mountain activities in the Himalayas.', duration: '5 Days / 4 Nights', price: '₹22,000', image: IMG('photo-1464822759023-fed622ff2c3b', 1400), featured: true },
  { id: 2, title: 'Serene Kerala Backwaters', location: 'Kerala', dest: 'Kerala', description: 'Houseboat cruise, spice gardens and relaxing nature stays.', duration: '6 Days / 5 Nights', price: '₹28,500', image: IMG('photo-1441974231531-c6227db76b6e', 800) },
  { id: 3, title: 'Vibrant Goa Getaway', location: 'Goa', dest: 'Goa', description: 'Beaches, nightlife, water sports and fresh coastal seafood.', duration: '4 Days / 3 Nights', price: '₹15,000', image: IMG('photo-1519046904884-53103b34b206', 800) },
  { id: 4, title: 'Royal Rajasthan Heritage', location: 'Rajasthan', dest: 'Rajasthan', description: 'Jaipur forts, Udaipur lakes and the culture of the desert state.', duration: '7 Days / 6 Nights', price: '₹32,000', image: IMG('photo-1477587458883-47145ed94245', 800) },
  { id: 5, title: 'Andaman Tropical Paradise', location: 'Andaman Islands', dest: 'Andaman', description: 'White-sand beaches, scuba diving and Havelock sunsets.', duration: '6 Days / 5 Nights', price: '₹45,000', image: IMG('photo-1544551763-46a013bb70d5', 800) },
  { id: 6, title: 'Kashmir Valley Tour', location: 'Jammu & Kashmir', dest: 'Kashmir', description: 'Shikara ride on Dal Lake, gardens and the snow views of Gulmarg.', duration: '5 Days / 4 Nights', price: '₹29,000', image: IMG('photo-1506905925346-21bda4d32df4', 800) },
  { id: 7, title: 'Epic Ladakh Expedition', location: 'Ladakh', dest: 'Leh-Ladakh', description: 'High passes, Pangong Lake camping and ancient monasteries.', duration: '8 Days / 7 Nights', price: '₹38,500', image: IMG('photo-1500530855697-b586d89ba3ee', 800) },
  { id: 8, title: 'Darjeeling Tea Trail', location: 'West Bengal', dest: 'Darjeeling', description: 'Kanchenjunga sunrise, toy train ride and tea estates.', duration: '4 Days / 3 Nights', price: '₹18,000', image: IMG('photo-1433838552652-f9a46b332c40', 800) },
  { id: 9, title: 'Mystic Meghalaya', location: 'Meghalaya', dest: 'Meghalaya', description: 'Living root bridges, waterfalls and deep caves.', duration: '6 Days / 5 Nights', price: '₹26,000', image: IMG('photo-1470071459604-3b5ec3a7fe05', 800) },
];
 
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const offset = window.innerWidth < 1024 ? 70 : 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
};
 
// Pre-fills the booking form (destination / date) and scrolls to it.
export const prefillBooking = (detail = {}) => {
  window.dispatchEvent(new CustomEvent('prefill-booking', { detail }));
  scrollToId('booking');
};