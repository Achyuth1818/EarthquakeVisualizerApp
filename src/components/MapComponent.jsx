import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { useAppContext } from "../context/AppContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/**
 * getColor
 *
 * Returns a strong, solid color based on the earthquake magnitude.
 * Uses a bold color scale for better visual distinction.
 *
 * @param {number} mag - Earthquake magnitude
 * @returns {string} - HEX color code
 */
const getColor = (mag) => {
  const colors = [
    "#0033cc", // < 2.0 - deep blue
    "#0066ff", // 2.0 - 2.9 - vivid blue
    "#009900", // 3.0 - 3.9 - bold green
    "#ffff00", // 4.0 - 4.9 - yellow
    "#ff9900", // 5.0 - 5.9 - bold orange
    "#ff0000", // 6.0 - 6.9 - bold red
    "#990000", // 7.0+ - dark red
  ];

  if (mag >= 7.0) return colors[6];
  if (mag >= 6.0) return colors[5];
  if (mag >= 5.0) return colors[4];
  if (mag >= 4.0) return colors[3];
  if (mag >= 3.0) return colors[2];
  if (mag >= 2.0) return colors[1];
  return colors[0];
};

/**
 * getRadius
 *
 * Calculates the marker radius based on magnitude.
 * Ensures a minimum size for low-magnitude quakes.
 *
 * @param {number} mag - Earthquake magnitude
 * @returns {number} - Radius for CircleMarker
 */
const getRadius = (mag) => Math.max(mag * 3, 6);

/**
 * FitBounds
 *
 * Automatically adjusts the map view to fit all earthquake markers.
 * Falls back to world view if data is missing.
 *
 * @param {Object} data - GeoJSON earthquake data
 */
const FitBounds = ({ data }) => {
  const map = useMap();

  if (!data || !data.features.length) {
    map.setView([0, 0], 2);
    return null;
  }

  const bounds = data.features.reduce((bounds, quake) => {
    const coords = quake.geometry.coordinates;
    return bounds.extend([coords[1], coords[0]]);
  }, new L.LatLngBounds());

  map.fitBounds(bounds, { maxZoom: 5, padding: [50, 50] });

  return null;
};

/**
 * MapComponent
 *
 * Renders the interactive Leaflet map with earthquake data.
 * Features include:
 * - Color-coded magnitude markers
 * - Popups with quake info
 * - Dynamic map fitting
 */
const MapComponent = () => {
  const { data } = useAppContext();

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={8}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
      className="rounded-xl shadow-lg border border-gray-300"
    >
      {/* OpenStreetMap Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        noWrap={true}
      />

      {/* Fit map to bounds based on data */}
      <FitBounds data={data || { features: [] }} />

      {/* Earthquake Markers */}
      {data &&
        data.features.map((quake) => {
          const [lng, lat] = quake.geometry.coordinates;
          const mag = quake.properties.mag;
          const place = quake.properties.place || "Unknown Location";
          const time = new Date(quake.properties.time).toLocaleString();

          // Skip invalid or missing data
          if (isNaN(mag) || lat === undefined || lng === undefined) return null;

          return (
            <CircleMarker
              key={quake.id}
              center={[lat, lng]}
              radius={getRadius(mag)}
              pathOptions={{
                color: getColor(mag),
                fillColor: getColor(mag),
                fillOpacity: 0.8,
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs text-sm text-gray-800 space-y-1">
                  <h3 className="font-semibold text-base">{place}</h3>
                  <p>
                    <strong>Magnitude:</strong>{" "}
                    <span className="text-black">{mag.toFixed(1)}</span>
                  </p>
                  <p>
                    <strong>Time:</strong> {time}
                  </p>
                  {quake.properties.felt && (
                    <p>
                      <strong>Felt by:</strong> {quake.properties.felt} people
                    </p>
                  )}
                  {quake.properties.tsunami === 1 && (
                    <p className="text-red-600 font-bold">
                      🌊 Tsunami Warning!
                    </p>
                  )}
                  <a
                    href={quake.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on USGS →
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
    </MapContainer>
  );
};

export default MapComponent;
