import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

/**
 * App Component
 *
 * Defines the main routing logic for the Earthquake Visualizer application.
 * Uses React Router to navigate between the landing page and the dashboard.
 *
 * Routes:
 * - "/" → LandingPage (home screen)
 * - "/dashboard" → Dashboard (map and data interface)
 * - "*" → Redirects all unknown routes back to "/"
 */
const App = () => {
  return (
    <Routes>
      {/* Landing Page Route */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Fallback: Redirect any unknown paths to Landing Page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
