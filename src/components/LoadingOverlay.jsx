import { useState, useEffect } from 'react'
import './LoadingOverlay.css'

const SHOW_LOADING = true // Set to false to disable loading animation for testing
const TOTAL_DISPLAY_MS = 2500
const FADE_OUT_MS = 500

function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(SHOW_LOADING)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!SHOW_LOADING) return

    // Wait for fonts and initial render
    const timer = setTimeout(() => {
      setIsLoaded(true)

      // Start fade out after animation completes
      setTimeout(() => {
        setIsVisible(false)
      }, FADE_OUT_MS)
  
    }, TOTAL_DISPLAY_MS)

    return () => clearTimeout(timer)
  }, [])

  if (!SHOW_LOADING || !isVisible) return null

  return (
    <div 
      className={
        `fixed inset-0 z-50 flex items-center justify-center bg-amber-50 transition-opacity duration-700 ease-in-out 
        ${isLoaded ? 'opacity-0' : 'opacity-100'}`
      }
    >
      <h1 className="font-tiempos text-5xl text-gray-800 animate-fade-in">
        Jenul Ferdinand
      </h1>
    </div>
  )
}

export default LoadingOverlay