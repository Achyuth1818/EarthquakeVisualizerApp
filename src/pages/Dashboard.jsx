import { useAppContext } from "../context/AppContext";
import MapComponent from "../components/MapComponent";
import { Globe } from "lucide-react";

/**
 * Dashboard Component
 *
 * Displays the Earthquake Dashboard, which includes:
 * - A header with a title and timeframe dropdown
 * - An interactive map displaying real-time earthquake data
 * - An error message overlay if data fetching fails
 *
 * Uses context (`useAppContext`) to manage selected timeframe and error state.
 */
const Dashboard = () => {
  // Accessing global context: timeframe state and error flag
  const { timeframe, setTimeframe, error } = useAppContext();

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="backdrop-blur-md bg-gradient-to-r from-teal-600 via-indigo-700 to-indigo-800 text-white p-5 shadow-lg border-b border-indigo-900">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Title with Globe Icon */}
          <h2
            className="flex items-center gap-3 
            text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-md min-w-[150px] flex-shrink-0"
          >
            <Globe className="w-5 sm:w-6 md:w-7 text-teal-300" />
            Earthquake Dashboard
          </h2>

          {/* Timeframe Dropdown */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="cursor-pointer 
              text-sm sm:text-base md:text-lg text-indigo-900 bg-white rounded-lg 
              px-4 sm:px-5 py-2 font-semibold shadow-md
              focus:outline-none focus:ring-4 focus:ring-teal-300
              hover:shadow-lg transition duration-300 
              w-full sm:w-auto min-w-[140px] md:min-w-[180px]"
            aria-label="Select earthquake data timeframe"
          >
            <option value="hour">Past Hour</option>
            <option value="day">Past Day</option>
            <option value="week">Past Week</option>
          </select>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 relative bg-gray-100 overflow-x-scroll dashboard-scrollbar">
        {/* Error Overlay (if data fetch fails) */}
        {error && (
          <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
            <div className="text-center text-red-700 bg-red-100 p-6 rounded-lg shadow-md border border-red-300">
              <p className="font-semibold text-lg">Error fetching data.</p>
              <p className="text-sm mt-2">
                Please check your internet connection or try again later.
              </p>
            </div>
          </div>
        )}

        {/* Map Display Area */}
        <div className="h-full w-[150vw] sm:w-full">
          <MapComponent />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
