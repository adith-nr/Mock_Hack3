"use client"
import { MapPin, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from "lucide-react"

const HotelCard = ({ hotel }) => {
  // Parse amenities if they exist
  const amenities = hotel.amenities || []

  // Amenity icons mapping
  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    breakfast: Coffee,
    restaurant: Utensils,
    gym: Dumbbell,
    pool: Waves,
  }

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase()
    for (const [key, Icon] of Object.entries(amenityIcons)) {
      if (amenityLower.includes(key)) {
        return Icon
      }
    }
    return Coffee // Default icon
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Hotel Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-400">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl">🏨</div>
        </div>
        {hotel.rating && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-semibold text-gray-700">{hotel.rating}</span>
          </div>
        )}
      </div>

      {/* Hotel Content */}
      <div className="p-6">
        {/* Hotel Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{hotel.name || "Hotel Name"}</h3>

        {/* Location */}
        {hotel.location && (
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{hotel.location}</span>
          </div>
        )}

        {/* Description */}
        {hotel.description && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{hotel.description}</p>}

        {/* Price */}
        {hotel.price && (
          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">{hotel.price}</span>
            <span className="text-gray-500 text-sm ml-1">per night</span>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 4).map((amenity, idx) => {
                const Icon = getAmenityIcon(amenity)
                return (
                  <div key={idx} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                    <Icon className="w-3 h-3 mr-1" />
                    {amenity}
                  </div>
                )
              })}
              {amenities.length > 4 && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                  +{amenities.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelCard
