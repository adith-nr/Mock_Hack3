import React, { useState } from 'react';
import HotelInputs from '../components/HotelInputs';
import HotelCard from '../components/HotelCard';
import hotelData from '../info/hotel-data.json';

const initialData = {
  location: '',
  prompt: ''
};

const Stay = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('hotelForm');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handlePromptChange = (e) => {
    setForm({ ...form, prompt: e.target.value });
  };

  const isFormComplete = form.location.trim() !== '' && form.prompt.trim() !== '';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!isFormComplete) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    // Store form in localStorage
    localStorage.setItem('hotelForm', JSON.stringify(form));
    // Log form data to console
    console.log('Hotel search:', form);

    try {
      const res = await fetch('http://localhost:3000/api/prompt/Hotel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Could not fetch hotel data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-green-100"
      style={{ scrollSnapAlign: 'start' }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Find Your Stay</h1>
      <div className="flex flex-row items-start justify-center w-full">
        {/* Shift HotelInputs to the left */}
        <div style={{ marginRight: '4rem' }}>
          <HotelInputs
            form={form}
            handleChange={handleChange}
            handlePromptChange={handlePromptChange}
            handleSearch={handleSearch}
            isFormComplete={isFormComplete}
          />
          {loading && <div className="mt-4 text-blue-600">Loading...</div>}
          {error && <div className="mt-4 text-red-600">{error}</div>}
          {response && (
            <div className="mt-4 bg-white rounded shadow p-4 max-w-xl w-full">
              <pre className="whitespace-pre-wrap break-words">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
        {/* Hotel cards column */}
        <div
          className="flex flex-col items-start"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '1rem',
            maxHeight: '96vh',
            height: '80vh',
            overflowY: 'auto',
            padding: '2rem',
            display: 'flex',
            gap: '0.2rem',
            minWidth: '1220px'
          }}
        >
          {hotelData.hotels.map((hotel, idx) => (
            <HotelCard key={idx} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stay;