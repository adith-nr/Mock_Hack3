import React, { useState, useEffect } from 'react';

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
  const [form, setForm] = useState(initialData);
  const [layoverInput, setLayoverInput] = useState('');

  useEffect(() => {
    // fetch('/api/flight-data', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // });
    // For demo, just log to console
    console.log('Updated flight data:', form);
  }, [form]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSelectChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const addLayover = (e) => {
    e.preventDefault();
    if (layoverInput.trim() !== '') {
      setForm({ ...form, layovers: [...form.layovers, layoverInput.trim()] });
      setLayoverInput('');
    }
  };

  const removeLayover = (index) => {
    setForm({ ...form, layovers: form.layovers.filter((_, i) => i !== index) });
  };

  return (
    <section
      className="flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-blue-100"
      style={{ scrollSnapAlign: 'start' }}
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
              className="border rounded px-3 py-2 flex-1"
              placeholder="Add layover destination"
              value={layoverInput}
              onChange={e => setLayoverInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded"
              onClick={addLayover}
            >
              Add
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.layovers.map((layover, idx) => (
              <div
                key={idx}
                className="relative group"
              >
                <input
                  type="text"
                  className="border rounded px-3 py-2 bg-gray-50 w-full pr-16"
                  value={layover}
                  readOnly
                  style={{ cursor: 'default' }}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
      </form>
    </section>
  );
};

export default Flights;