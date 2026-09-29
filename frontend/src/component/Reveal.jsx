import React, { useEffect, useRef, useState } from 'react';

// Wrap any element: it fades/slides in when it enters the viewport.
const Reveal = ({ children, delay = 0, from = 'up', className = '' }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === 'left' ? '-translate-x-12' : from === 'right' ? 'translate-x-12' : 'translate-y-12';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        show ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hidden}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
