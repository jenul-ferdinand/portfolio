import { useState, useEffect } from "react";

const CACHE_KEY = "volunteering_cache";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/jenul-ferdinand/resume/refs/heads/main/data/volunteering.json";

export function useVolunteering() {
  const [volunteerings, setVolunteerings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteering = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;

          // Use cache if it's fresh
          if (age < CACHE_DURATION_MS) {
            console.log("Using cached volunteering data");
            setVolunteerings(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Failed to parse cache:", err);
        }
      }

      // Fetch from GitHub if no cache or stale
      console.log("Fetching volunteerings from GitHub");
      try {
        // Make request
        const response = await fetch(GITHUB_RAW_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        // Get data from response
        const data = await response.json();
        if (!data.experiences) {
          throw new Error("No data found in volunteering");
        }

        // Update state store data
        setVolunteerings(data.experiences);
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
          "Failed to fetch volunteering data from GitHub:",
          err.message,
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteering();
  }, []);

  return { volunteerings, loading, error };
}
