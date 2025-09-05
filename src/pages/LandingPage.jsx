import { useNavigate } from "react-router-dom";

/**
 * LandingPage Component
 *
 * This component renders the landing page of the Earthquake Visualizer application.
 * It features a heading, description, and a call-to-action button that navigates
 * the user to the dashboard for exploring real-time earthquake data.
 */
const LandingPage = () => {
  // Hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-center px-4 py-8">
      {/* Main Title */}
      <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
        Earthquake Visualizer
      </h1>

      {/* Subtitle / Description */}
      <p className="text-lg text-white mb-10 max-w-lg leading-relaxed">
        Discover real-time earthquake data with an interactive map. Explore
        seismic events from the past hour, day, week with ease.
      </p>

      {/* Button to navigate to dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
        aria-label="Enter Earthquake Visualizer Dashboard"
      >
        Explore Now
      </button>
    </div>
  );
};

export default LandingPage;
