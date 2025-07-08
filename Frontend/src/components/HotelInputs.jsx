"use client"
import { MapPin, MessageSquare, Search } from "lucide-react"

const HotelInputs = ({ form, handleChange, handlePromptChange, handleSearch, isFormComplete, loading }) => {
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSearch} className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Location Input */}
            <div className="w-full">
              <label
                htmlFor="location"
                className="flex items-center justify-center text-sm font-semibold text-gray-700 mb-3"
              >
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Location
              </label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="Enter city, country, or region..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 text-center"
                disabled={loading}
              />
            </div>

            {/* Prompt Input */}
            <div className="w-full">
              <label
                htmlFor="prompt"
                className="flex items-center justify-center text-sm font-semibold text-gray-700 mb-3"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                Preferences
              </label>
              <textarea
                id="prompt"
                value={form.prompt}
                onChange={handlePromptChange}
                placeholder="Describe your ideal hotel (luxury, budget, family-friendly, etc.)..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 text-center resize-none"
                disabled={loading}
              />
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!isFormComplete || loading}
                className={`
                  flex items-center px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform
                  ${
                    isFormComplete && !loading
                      ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
              >
                <Search className="w-5 h-5 mr-2" />
                {loading ? "Searching..." : "Search Hotels"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HotelInputs
