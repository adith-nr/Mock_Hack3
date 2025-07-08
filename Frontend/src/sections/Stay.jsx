"use client"

import { useState } from "react"
import HotelInputs from "../components/HotelInputs"
import HotelCard from "../components/HotelCard"

const initialData = {
  location: "",
  prompt: "",
}

const Stay = () => {
  const [form, setForm] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hotelForm")
      return saved ? JSON.parse(saved) : initialData
    }
    return initialData
  })

  const [loading, setLoading] = useState(false)
  const [hotels, setHotels] = useState([])
  const [error, setError] = useState(null)

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handlePromptChange = (e) => {
    setForm({ ...form, prompt: e.target.value })
  }

  const isFormComplete = form.location.trim() !== "" && form.prompt.trim() !== ""

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!isFormComplete) return

    setLoading(true)
    setError(null)
    setHotels([])

    if (typeof window !== "undefined") {
      localStorage.setItem("hotelForm", JSON.stringify(form))
    }

    console.log("Hotel search:", form)

    try {
      const res = await fetch("http://localhost:3000/api/prompt/Hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Failed to fetch")

      const data = await res.json()
      const parsedHotels = JSON.parse(data.hotel_details)
      setHotels(parsedHotels)
    } catch (err) {
      console.error(err)
      setError("Could not fetch hotel data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 lg:py-12 min-h-full">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
            Discover amazing hotels tailored to your preferences and location
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
          <HotelInputs
            form={form}
            handleChange={handleChange}
            handlePromptChange={handlePromptChange}
            handleSearch={handleSearch}
            isFormComplete={isFormComplete}
            loading={loading}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-blue-600 text-lg font-medium">Searching for perfect hotels...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <div className="text-red-600 mr-3">⚠️</div>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {hotels.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Found {hotels.length} Perfect {hotels.length === 1 ? "Hotel" : "Hotels"}
              </h2>
              <p className="text-gray-600">Based on your search criteria</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {hotels.map((hotel, idx) => (
                <HotelCard key={idx} hotel={hotel} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && hotels.length === 0 && form.location && form.prompt && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hotels found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stay
