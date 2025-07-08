import React from 'react';

const Stays = () => (
  <section
    className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-green-100"
    style={{ scrollSnapAlign: 'start' }}
  >
    <h1 className="text-4xl font-bold text-green-700 mb-8">Stays</h1>
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
      <p className="text-gray-700">Your accommodation details will appear here.</p>
    </div>
  </section>
);

export default Stays;