import React from 'react';

const FlightInputs = ({
  form,
  layoverInput,
  handleChange,
  handleSelectChange,
  handleLayoverInputChange,
  addLayover,
  removeLayover,
  isFormComplete,
  handleSearch,
  formatDate,
  setForm,
  setLayoverInput
}) => (
  <form
    className="bg-white rounded-lg shadow p-6 flex flex-col gap-4"
    style={{
      width: '480px', // Increased width (adjust as needed)
      maxWidth: '100%',
      minWidth: '380px'
    }}
  >
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
            className="border rounded px-2 py-2"
            style={{ width: '102px' }}
            placeholder="Departure"
            value={layoverInput.departure}
            onChange={e => setLayoverInput({ ...layoverInput, departure: formatDate(e.target.value) })}
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
              className="border rounded px-3 py-2 bg-gray-50"
              style={{ width: '88px', cursor: 'default' }}
              value={layover.departure}
              readOnly
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
);

export default FlightInputs;