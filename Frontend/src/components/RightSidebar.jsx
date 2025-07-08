import React from 'react';

const RightSidebar = ({ scrollTargetId }) => {
  const handleClick = () => {
    const target = document.getElementById(scrollTargetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <div
      className="fixed right-0 top-0 h-screen w-[65px] bg-white/40 backdrop-blur z-30 flex flex-col items-center justify-center cursor-pointer"
      style={{ boxShadow: '-2px 0 8px rgba(0,0,0,0.04)' }}
      onClick={handleClick}
      title="Go to Flights"
    >
      <span className="text-lg font-bold text-blue-700 rotate-90 select-none">→</span>
    </div>
  );
};

export default RightSidebar;