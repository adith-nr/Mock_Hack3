import React, { useRef } from 'react';
import Flights from './sections/Flights';
import Stays from './sections/Stays';
import Activities from './sections/Activities';
import Itenary from './sections/Itenary';

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
      <Itenary />
      <Flights />
      <Activities />
      <Stays />
    </div>
  );
}

export default App;