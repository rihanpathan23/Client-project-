import React, { useState } from 'react';

// Shows a nice gradient with a label instead of a broken image icon.
const SafeImage = ({ src, alt = '', label = '', className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-sky-600 via-sky-900 to-orange-500 flex items-center justify-center text-white/70 font-bold text-lg`}
      >
        {label || alt}
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
};

export default SafeImage;
