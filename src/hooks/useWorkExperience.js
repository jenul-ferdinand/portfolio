import { useState, useEffect } from "react";

const CACHE_KEY = "work_experience_cache";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/jenul-ferdinand/resume/refs/heads/main/data/work_experience.json";

export function useWorkExperience() {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      // Check cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;

          // Use cache if it's fresh
          if (age < CACHE_DURATION_MS) {
            console.log("Using cached work experience data");
            setWorkExperiences(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Failed to parse cache:", err);
        }
      }

      // Fetch from GitHub if no cache or stale
      console.log("Fetching work experience from GitHub");
      try {
        // Make request
        const response = await fetch(GITHUB_RAW_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        // Get data from response
        const data = await response.json();
        if (!data.experiences) {
          throw new Error("No data found for work experiences");
        }

        // Update state store data
        setWorkExperiences(data.experiences);
        setError(null);

        // Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: data.experiences,
            timestamp: Date.now(),
          }),
        );
      } catch (err) {
        console.warn(
          "Failed to fetch work experience from GitHub:",
          err.message,
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperience();
  }, []);

  return { workExperiences, loading, error };
}
