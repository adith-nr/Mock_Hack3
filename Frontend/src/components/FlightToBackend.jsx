import React, { useState } from 'react';

const FlightToBackend = ({ localStorageKey = 'flightForm', endpoint = 'http://localhost:5000/api/flight-data' }) => {
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    const data = localStorage.getItem(localStorageKey);
    if (!data) {
      setStatus('No data found in localStorage.');
      return;
    }
    setStatus('Sending...');
    try {
      const response = await fetch(endpoint, {
        method: 'POST', // or 'PUT' depending on your backend
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      if (response.ok) {
        setStatus('Data sent successfully!');
      } else {
        setStatus('Failed to send data.');
      }
    } catch (error) {
      setStatus('Error sending data.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleSend}
        type="button"
      >
        Send Data to Backend
      </button>
      {status && <span className="mt-2 text-sm text-gray-700">{status}</span>}
    </div>
  );
};

export default FlightToBackend;