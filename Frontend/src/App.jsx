"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Flights from "./sections/Flights"
import Stay from "./sections/Stay"
import Activities from "./sections/Activities"
import Itenary from "./sections/Itenary"

function App() {
  const containerRef = useRef(null)
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { id: "itinerary", name: "Itinerary", component: Itenary },
    { id: "flights", name: "Flights", component: Flights },
    { id: "activities", name: "Activities", component: Activities },
    { id: "stay", name: "Stay", component: Stay },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isVerticallyScrollable = (el) => {
      while (el && el !== container) {
        const style = window.getComputedStyle(el)
        if ((style.overflowY === "auto" || style.overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          return true
        }
        el = el.parentElement
      }
      return false
    }

    const handleWheel = (e) => {
      if (isVerticallyScrollable(e.target)) {
        return
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }

    // Track current section
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const sectionWidth = container.clientWidth
      const newSection = Math.round(scrollLeft / sectionWidth)
      setCurrentSection(newSection)
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionIndex) => {
    const container = containerRef.current
    if (!container) return

    const sectionWidth = container.clientWidth
    container.scrollTo({
      left: sectionIndex * sectionWidth,
      behavior: "smooth",
    })
  }

  const goToNext = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }

  const goToPrevious = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }

  return (
    <div className="relative w-screen h-screen">
      {/* Main Content */}
      <div
        ref={containerRef}
        className="w-full h-full flex overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {sections.map((section, index) => {
          const Component = section.component
          return (
            <div
              key={section.id}
              id={section.id}
              className="flex-shrink-0 w-screen h-screen"
              style={{ scrollSnapAlign: "start" }}
            >
              <Component />
            </div>
          )
        })}
      </div>

      {/* Navigation Sidebars */}
      {currentSection > 0 && (
        <div
          className="fixed left-0 top-0 h-screen w-[65px] bg-white/40 backdrop-blur z-30 flex flex-col items-center justify-center cursor-pointer hover:bg-white/60 transition-all duration-200"
          style={{ boxShadow: "2px 0 8px rgba(0,0,0,0.04)" }}
          onClick={goToPrevious}
          title={`Go to ${sections[currentSection - 1]?.name}`}
        >
          <ChevronLeft className="text-blue-700 w-6 h-6 rotate-90" />
        </div>
      )}

      {currentSection < sections.length - 1 && (
        <div
          className="fixed right-0 top-0 h-screen w-[65px] bg-white/40 backdrop-blur z-30 flex flex-col items-center justify-center cursor-pointer hover:bg-white/60 transition-all duration-200"
          style={{ boxShadow: "-2px 0 8px rgba(0,0,0,0.04)" }}
          onClick={goToNext}
          title={`Go to ${sections[currentSection + 1]?.name}`}
        >
          <ChevronRight className="text-blue-700 w-6 h-6 rotate-90" />
        </div>
      )}

      {/* Section Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2 bg-white/80 backdrop-blur rounded-full px-4 py-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSection ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              title={section.name}
            />
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-white/80 backdrop-blur rounded-full px-6 py-2">
          <span className="text-sm font-semibold text-gray-700">{sections[currentSection]?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default App
