import React, { useState, useEffect } from 'react';
import FlightToBackend from '../components/FlightToBackend';

const formatDate = (value) => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  if (digits.length <= 4) {
    formatted = digits;
  } else if (digits.length <= 6) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  } else {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  }
  return formatted;
};

const initialData = {
  numberOfDays: '',
  budgetClass: '',
  destination: '',
  origin: '',
  layovers: [],
  arrivalDate: '',
  departureDate: ''
};

const Flights = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('flightForm');
    return saved ? JSON.parse(saved) : initialData;
  });
  // Layover input as an object for destination, arrival, departure
  const [layoverInput, setLayoverInput] = useState({ destination: '', arrival: '', departure: '' });

  useEffect(() => {
    localStorage.setItem('flightForm', JSON.stringify(form));
  }, [form]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSelectChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // Handle layover input changes
  const handleLayoverInputChange = (field) => (e) => {
    setLayoverInput({ ...layoverInput, [field]: e.target.value });
  };

  // Add layover as an object with destination, arrival, departure
  const addLayover = (e) => {
    e.preventDefault();
    if (
      layoverInput.destination.trim() &&
      layoverInput.arrival.trim() &&
      layoverInput.departure.trim()
    ) {
      setForm({
        ...form,
        layovers: [...form.layovers, { ...layoverInput }]
      });
      setLayoverInput({ destination: '', arrival: '', departure: '' });
    }
  };

  const removeLayover = (index) => {
    setForm({
      ...form,
      layovers: form.layovers.filter((_, i) => i !== index)
    });
  };

  const isFormComplete =
    form.numberOfDays &&
    form.budgetClass &&
    form.destination &&
    form.origin &&
    form.arrivalDate.length === 10 &&
    form.departureDate.length === 10;

  const handleSearch = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      console.log('Search data:', form);
    }
  };

  return (
    <section
      className="flex-shrink-0 h-screen flex flex-col items-center justify-center bg-blue-100"
      style={{ width: '110vw', scrollSnapAlign: 'start', overflowY: 'auto' }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Flights</h1>
      <form className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Number of Days</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.numberOfDays}
            onChange={handleSelectChange('numberOfDays')}
          >
            <option value="">Select days</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Budget</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.budgetClass}
            onChange={handleSelectChange('budgetClass')}
          >
            <option value="">Class</option>
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first-class">First Class</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Destination</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange('destination')}
          />
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Origin</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Origin"
            value={form.origin}
            onChange={handleChange('origin')}
          />
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Layovers</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="border rounded px-2 py-2 flex-1"
              placeholder="Destination"
              value={layoverInput.destination}
              onChange={handleLayoverInputChange('destination')}
            />
            {layoverInput.destination.trim() !== '' && (
              <input
                type="text"
                className="border rounded px-2 py-2 w-24"
                placeholder="Departure"
                value={layoverInput.departure}
                onChange={handleLayoverInputChange('departure')}
              />
            )}
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded"
              onClick={addLayover}
              disabled={
                !layoverInput.destination.trim() ||
                !layoverInput.departure.trim()
              }
            >
              Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.layovers.map((layover, idx) => (
              <div key={idx} className="relative group flex gap-2 items-center">
                <input
                  type="text"
                  className="border rounded px-3 py-2 bg-gray-50 w-32"
                  value={layover.destination}
                  readOnly
                  style={{ cursor: 'default' }}
                />
                <input
                  type="text"
                  className="border rounded px-3 py-2 bg-gray-50 w-24"
                  value={layover.departure}
                  readOnly
                  style={{ cursor: 'default' }}
                />
                <button
                  type="button"
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeLayover(idx)}
                  tabIndex={-1}
                  title="Remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Arrival Date (yyyy-mm-dd)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="yyyy-mm-dd"
            value={form.arrivalDate}
            onChange={e => setForm({ ...form, arrivalDate: formatDate(e.target.value) })}
            maxLength={10}
          />
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Departure Date (yyyy-mm-dd)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="yyyy-mm-dd"
            value={form.departureDate}
            onChange={e => setForm({ ...form, departureDate: formatDate(e.target.value) })}
            maxLength={10}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full py-2 rounded text-white font-semibold transition ${
            isFormComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
          }`}
          disabled={!isFormComplete}
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      <FlightToBackend localStorageKey="flightForm" endpoint="http://localhost:5000/api/flight-data" />
    
    </section>
  );
};

export default Flights;