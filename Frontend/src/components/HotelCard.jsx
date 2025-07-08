import React from 'react';

const HotelCard = ({ hotel }) => (
  <div
    className="bg-white rounded-xl shadow-lg flex items-center border-l-8 border-blue-400 mb-4"
    style={{
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      padding: '1rem 2rem',
      height: '3.5rem', // Make the card thin
      fontSize: '1rem'
    }}
  >
    <span className="font-bold text-blue-700 mr-6 truncate" style={{ minWidth: 0, flex: 2 }}>{hotel.name}</span>
    <span className="text-yellow-500 font-semibold mr-4" style={{ minWidth: 60 }}>{'★'.repeat(Number(hotel.stars))}</span>
    <span className="text-gray-600 mr-2">Loc:</span>
    <span className="font-semibold mr-6 truncate" style={{ minWidth: 0, flex: 1 }}>{hotel.location}</span>
    <span className="text-gray-600 mr-2">₹</span>
    <span className="font-bold text-green-700 mr-6">{hotel.price}</span>
    <span className="text-gray-600 mr-2">Rating:</span>
    <span className="font-semibold mr-6">{hotel.rating}</span>
    <span className="text-gray-600 mr-2">Stars:</span>
    <span className="font-semibold">{hotel.stars}</span>
  </div>
);

export default HotelCard;