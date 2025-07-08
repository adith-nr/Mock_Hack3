"use client"
import { CalendarDays, MapPin, Plane, Clock, Trash2, Plus, DollarSign, ChevronDown } from "lucide-react"

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
  setLayoverInput,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Flight Search</h2>
        </div>
        <p className="text-gray-600">Plan your perfect journey with customizable flight options</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Trip Duration and Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="h-4 w-4 text-blue-600" />
              Trip Duration
            </label>
            <div className="relative">
              <select
                value={form.numberOfDays}
                onChange={(e) => handleSelectChange("numberOfDays")(e.target.value)}
                className="w-full h-11 px-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select days</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "day" : "days"}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Travel Class
            </label>
            <div className="relative">
              <select
                value={form.budgetClass}
                onChange={(e) => handleSelectChange("budgetClass")(e.target.value)}
                className="w-full h-11 px-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select class</option>
                <option value="economy">Economy</option>
                <option value="premium-economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first-class">First Class</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Origin and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="h-4 w-4 text-green-600" />
              From
            </label>
            <input
              type="text"
              placeholder="Origin city or airport"
              value={form.origin}
              onChange={handleChange("origin")}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="h-4 w-4 text-red-600" />
              To
            </label>
            <input
              type="text"
              placeholder="Destination city or airport"
              value={form.destination}
              onChange={handleChange("destination")}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              Departure Date
            </label>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              value={form.departureDate}
              onChange={(e) => setForm({ ...form, departureDate: formatDate(e.target.value) })}
              maxLength={10}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              Return Date
            </label>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              value={form.arrivalDate}
              onChange={(e) => setForm({ ...form, arrivalDate: formatDate(e.target.value) })}
              maxLength={10}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Layovers Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Plane className="h-4 w-4 text-purple-600" />
            Layovers (Optional)
          </label>

          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Layover destination"
                value={layoverInput.destination}
                onChange={handleLayoverInputChange("destination")}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {layoverInput.destination.trim() !== "" && (
                <input
                  type="text"
                  placeholder="Departure time"
                  value={layoverInput.departure}
                  onChange={(e) => setLayoverInput({ ...layoverInput, departure: formatDate(e.target.value) })}
                  className="w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              <button
                type="button"
                onClick={addLayover}
                disabled={!layoverInput.destination.trim() || !layoverInput.departure.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            {form.layovers.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">Added layovers:</p>
                {form.layovers.map((layover, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-md border">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      <MapPin className="h-3 w-3" />
                      {layover.destination}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded-full">
                      <CalendarDays className="h-3 w-3" />
                      {layover.departure}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLayover(idx)}
                      className="ml-auto p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          onClick={handleSearch}
          disabled={!isFormComplete}
          className={`w-full h-12 text-lg font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
            isFormComplete
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isFormComplete ? (
            <>
              <Plane className="h-5 w-5" />
              Search Flights
            </>
          ) : (
            "Complete form to search"
          )}
        </button>
      </div>
    </div>
  )
}

export default FlightInputs
