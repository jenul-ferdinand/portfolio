import { useState, useEffect } from 'react'
import './LoadingOverlay.css'

const TOTAL_DISPLAY_MS = 2500
const FADE_OUT_MS = 700

function LoadingOverlay() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFirstLaunch, setIsFirstLaunch] = useState(null) // null = checking, true = first launch, false = not first launch

  // * Check if first launch
  useEffect(() => {
    const hasLaunchedBefore = localStorage.getItem('hasLaunchedBefore');
    if (hasLaunchedBefore === null) {
      setIsFirstLaunch(true)
    } else {
      setIsFirstLaunch(false)
    }
  }, [])

  // * Fade in/out animation
  useEffect(() => {
    if (!isFirstLaunch) return

    // Set loading state
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, TOTAL_DISPLAY_MS)

    // Store local storage
    localStorage.setItem('hasLaunchedBefore', 'true')

    return () => clearTimeout(timer)
  }, [isFirstLaunch])

  // Don't render anything if it's not the first launch
  if (isFirstLaunch !== true) return null

  return (
    // The overlay itself
    <div
      className={
        `fixed inset-0 z-50 
        flex items-center justify-center 
        bg-neutral-950 
        transition-opacity duration-${FADE_OUT_MS} ease-in-out
        ${isLoaded ? 'opacity-0' : 'opacity-100'}`
      }
    >
      {/* Centered name */}
      <h1 className="font-tiempos text-5xl text-white animate-fade-in">
        Jenul Ferdinand
      </h1>
    </div>
  )
}

export default LoadingOverlay