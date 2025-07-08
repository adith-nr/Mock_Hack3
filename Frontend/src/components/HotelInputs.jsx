import React from 'react';

const HotelInputs = ({
  form,
  handleChange,
  handlePromptChange,
  handleSearch,
  isFormComplete
}) => (
  <form
    className="bg-white rounded-lg shadow p-6 flex flex-col gap-4"
    style={{
      width: '480px',
      maxWidth: '100%',
      minWidth: '380px'
    }}
  >
    <div>
      <label className="block text-blue-700 font-semibold mb-1">Location</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="Enter location"
        value={form.location}
        onChange={handleChange('location')}
      />
    </div>
    <div>
      <label className="block text-blue-700 font-semibold mb-1">Prompt</label>
      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Enter your prompt"
        value={form.prompt}
        onChange={handlePromptChange}
        rows={4}
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

export default HotelInputs;