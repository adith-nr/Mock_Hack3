import React from 'react';
import RightSidebar from '../components/RightSidebar';

const Itenary = () => (
  <section
    className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-purple-100 custom-scrollbar"
    style={{ scrollSnapAlign: 'start', overflowY: 'auto' }}
  >
    <RightSidebar scrollTargetId="flights-section" />
    <h1 className="text-4xl font-bold text-purple-700 mb-8">Itenary</h1>
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
      <p className="text-gray-700">Your trip itenary will appear here.</p>
    </div>
  </section>
);

export default Itenary;