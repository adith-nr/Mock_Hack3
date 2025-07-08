import React, { useRef } from 'react';
import Flights from './sections/Flights';

function App() {
  const containerRef = useRef(null);

  // Listen for vertical scroll and scroll horizontally
  const handleWheel = (e) => {
    if (containerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        containerRef.current.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="w-screen h-screen flex overflow-x-auto overflow-y-hidden scroll-smooth"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      <Flights />
      <section
        className="flex-shrink-0 w-screen h-screen flex items-center justify-center bg-green-100"
        style={{ scrollSnapAlign: 'start' }}
      >
        <h1 className="text-4xl font-bold text-green-700">Stays</h1>
      </section>
      <section
        className="flex-shrink-0 w-screen h-screen flex items-center justify-center bg-yellow-100"
        style={{ scrollSnapAlign: 'start' }}
      >
        <h1 className="text-4xl font-bold text-yellow-700">Activities</h1>
      </section>
    </div>
  );
}

export default App;