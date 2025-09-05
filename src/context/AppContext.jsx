import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AppContext
 *
 * Provides global state for the Earthquake Visualizer app, including:
 * - Selected timeframe (hour, day, week, month)
 * - Fetched earthquake data from USGS API
 * - Loading and error states
 */

const AppContext = createContext();

/**
 * Custom hook to access AppContext
 */
export const useAppContext = () => useContext(AppContext);

/**
 * TIMEFRAMES
 *
 * Maps each timeframe option to its corresponding USGS GeoJSON feed URL.
 */
const TIMEFRAMES = {
  hour: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
  day: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  week: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
  month:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
};

/**
 * AppProvider Component
 *
 * Wraps the app in a context provider that manages and shares global state:
 * - `timeframe`: selected timeframe (default: "day")
 * - `data`: fetched earthquake GeoJSON data
 * - `loading`: boolean indicating loading status
 * - `error`: string message if an error occurs
 *
 * Automatically fetches new data whenever the timeframe changes.
 */
export const AppProvider = ({ children }) => {
  const [timeframe, setTimeframe] = useState("day"); // Default timeframe
  const [data, setData] = useState(null); // Earthquake data
  const [loading, setLoading] = useState(false); // Loading status
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    let didCancel = false;
    let timeoutId;

    /**
     * fetchData
     *
     * Fetches earthquake data from the USGS feed for the selected timeframe.
     * If the request takes longer than 2 seconds, a timeout error is shown.
     */
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setData(null);

      // Timeout: Set error if fetch takes more than 2 seconds
      timeoutId = setTimeout(() => {
        if (!didCancel) {
          setError("Error fetching data: Request timed out.");
          setLoading(false);
        }
      }, 2000);

      try {
        const res = await fetch(TIMEFRAMES[timeframe]);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();

        if (!didCancel) {
          clearTimeout(timeoutId);
          setData(json);
          setLoading(false);
          setError("");
        }
      } catch {
        if (!didCancel) {
          clearTimeout(timeoutId);
          setError("Error fetching data");
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to cancel timeout and ignore state updates if unmounted
    return () => {
      didCancel = true;
      clearTimeout(timeoutId);
    };
  }, [timeframe]);

  return (
    <AppContext.Provider
      value={{ timeframe, setTimeframe, data, loading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};
