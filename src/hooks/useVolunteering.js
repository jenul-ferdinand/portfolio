import { useState, useEffect } from 'react'

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/jenul-ferdinand/resume/refs/heads/main/data/volunteering.json';

export function useVolunteering() {
  const [volunteerings, setVolunteerings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVolunteering = async () => {
      try {
        const response = await fetch(GITHUB_RAW_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        setVolunteerings(data.experiences || [])
        setError(null)
      } catch (err) {
        console.warn('Failed to fetch volunteering data from GitHub:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVolunteering()
  }, [])

  return { volunteerings, loading, error }
}