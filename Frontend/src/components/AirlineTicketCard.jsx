import React from 'react';

const AirlineTicketCard = ({ ticket }) => (
  <div
    className="relative"
    style={{
      minWidth: '600px',
      maxWidth: '600px',
      marginLeft: '155px' // Shift the whole card and floating box to the right
    }}
  >
    {/* Ticket Card */}
    <div
      className="bg-white shadow-lg rounded-xl px-8 py-6 border-l-8 border-blue-400 relative"
      style={{
        minWidth: '600px',
        maxWidth: '600px',
        fontFamily: 'monospace',
        transform: 'scale(1.5)',
        zIndex: 2
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-blue-700 text-lg">{ticket.airline}</span>
        <span className="text-xs text-gray-500">{ticket.flight_code}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl">{ticket.from_airport}</span>
        <span className="text-gray-400">→</span>
        <span className="text-xl">{ticket.to_airport}</span>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span>
          <span className="font-semibold">Dep:</span> {ticket.departure.replace('T', ' ')}
        </span>
        <span>
          <span className="font-semibold">Arr:</span> {ticket.arrival.replace('T', ' ')}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{ticket.duration}</span>
        <span className="font-bold text-green-600">{ticket.price}</span>
      </div>
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-100 rounded-full border border-blue-300"></div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-100 rounded-full border border-blue-300"></div>
    </div>
    {/* Floating booking link box below ticket, left oriented */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 'calc(100% + 24px)',
        background: '#f3f6fa',
        borderRadius: '0 0 1rem 1rem',
        boxShadow: '0 8px 24px 0 rgba(31,38,135,0.10)',
        padding: '1rem 2rem',
        minWidth: '900px',
        maxWidth: '420px',
        zIndex: 1,
        textAlign: 'left',
        transform: 'translateX(-16.8%) translateY(24%)',
      }}
    >
      <span className="font-semibold text-blue-700">Book now: </span>
      <a
        href={ticket.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {ticket.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
      </a>
    </div>
  </div>
);

export default AirlineTicketCard;