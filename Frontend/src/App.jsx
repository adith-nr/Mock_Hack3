import React, { useRef, useEffect } from 'react';
import Flights from './sections/Flights';
import Stay from './sections/Stay';
import Activities from './sections/Activities';
import Itenary from './sections/Itenary';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isVerticallyScrollable = (el) => {
      while (el && el !== container) {
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e) => {
      if (isVerticallyScrollable(e.target)) {
        // Let the inner scrollable div handle the event
        return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex overflow-x-auto overflow-y-hidden scroll-smooth"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      <Itenary />
      <Flights />
      <Activities />
      <Stay />
    </div>
  );
}

export default App;