import { useState, useEffect } from 'react'

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/jenul-ferdinand/resume/refs/heads/main/data/work_experience.json'

export function useWorkExperience() {
  const [workExperiences, setWorkExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await fetch(GITHUB_RAW_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }
        
        const data = await response.json()
        setWorkExperiences(data.experiences || [])
        setError(null)
      } catch (err) {
        console.warn('Failed to fetch work experience from GitHub:', err.message)
        setError(err.message)
        // Fallback to local data
        setWorkExperiences(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchWorkExperience()
  }, [])

  return { workExperiences, loading, error }
}

// Fallback data based on your current resume
function getFallbackData() {
  return [
    {
      companyImage: "https://placehold.co/48x48",
      role: "Computer Science Intern",
      companyName: "Hawthorn Football Club",
      location: "Mulgrave, VIC",
      startDate: "August 2025",
      endDate: "Present",
      description: [
        "Working with the technology team to build workflow optimisation projects for the coaches and staff.",
        "Developing an agentic pipeline with an environment setup by Google on their novel platform, Google Agentspace.",
        "Giving AI agents access to ChampionData hosted on the Snowflake platform."
      ]
    },
    {
      companyImage: "https://placehold.co/48x48",
      role: "Software Engineer",
      companyName: "Plandid",
      location: "Remote, VIC",
      startDate: "July 2025",
      endDate: "Present",
      description: [
        "Developing the backend using FastAPI and SQLAlchemy for Plandid's vendor marketplace mobile application. Built for couples looking for wedding photographers, videographers, and content creators.",
        "Implementing a GraphQL based matching system to match vendors and couples based on content style and preferences."
      ]
    },
    {
      companyImage: "https://placehold.co/48x48",
      role: "Programming Tutor",
      companyName: "Digimaker - Programming for Young Makers",
      location: "Eastern Suburbs, VIC",
      startDate: "October 2024",
      endDate: "Present",
      description: [
        "Teaching weekly Python, Java, C & JavaScript classes to primary school students across 8 different schools, achieving an average 90% in-class completion rate for my students.",
        "Used supplied lesson sheets to break down core programming concepts, allowing students to independently complete each coding challenge.",
        "Schools: Leibler Yavneh College, McKinnon PS, Ruskin Park PS, Mulgrave PS, ..."
      ]
    }
  ]
}