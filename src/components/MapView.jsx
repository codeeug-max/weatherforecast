// src/components/MapView.jsx
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { tempPrimary, getWeatherEmoji } from "../utils/weatherUtils";

// Fix default Leaflet marker icon (paths break in bundlers like Vite)
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component: recenter map when selected city changes
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 6); // zoom 6
  }, [lat, lon, map]);

  return null;
}

function MapView({ cities, selectedCityId, setSelectedCityId, settings }) {
  const selected =
    cities.find((c) => c.id === selectedCityId) || cities[0] || null;

  const lat = selected?.data?.coord?.lat ?? 14.5995; // fallback: Manila
  const lon = selected?.data?.coord?.lon ?? 120.9842;

  // URL to open Zoom Earth in a new tab for this city
  const zoomEarthUrl = `https://zoom.earth/#${lat},${lon},6z`;

  return (
    <div className="w-full max-w-6xl">
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl px-6 py-7 md:px-8 md:py-9">
        <h2 className="text-2xl font-semibold mb-1">Map</h2>
        <p className="text-sm text-slate-300 mb-4">
          Explore your saved cities on an interactive map. Tap a city or marker
          to recenter the view.
        </p>

        {cities.length === 0 && (
          <p className="text-sm text-slate-300">
            No cities yet. Search some on the <b>Weather</b> tab and they’ll
            appear here.
          </p>
        )}

        {cities.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-[2fr,1.1fr]">
            {/* LEFT: Live map with bottom overlay */}
            <div className="relative rounded-3xl border border-slate-800 overflow-hidden bg-slate-950">
              <MapContainer
                center={[lat, lon]}
                zoom={6}
                scrollWheelZoom={true}
                className="h-[320px] md:h-[420px] w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap lat={lat} lon={lon} />

                {cities.map((city) => {
                  const cLat = city.data?.coord?.lat;
                  const cLon = city.data?.coord?.lon;
                  if (cLat == null || cLon == null) return null;

                  const isActive = selected && selected.id === city.id;

                  return (
                    <Marker
                      key={city.id}
                      position={[cLat, cLon]}
                      icon={defaultIcon}
                      eventHandlers={{
                        click: () => setSelectedCityId(city.id),
                      }}
                    >
                      <Popup>
                        <div className="text-xs">
                          <div className="font-semibold mb-1">
                            {city.name}, {city.country}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <span>{getWeatherEmoji(city.weatherMain)}</span>
                            <span className="capitalize">
                              {city.weatherMain.toLowerCase()}
                            </span>
                          </div>
                          <div>
                            Temp:{" "}
                            <span className="font-semibold">
                              {tempPrimary(city.temp, settings)}
                            </span>
                          </div>
                          {isActive && (
                            <div className="mt-1 text-[11px] text-sky-300">
                              (Selected)
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* 📌 Overlay at bottom of the map frame */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-4
                      bottom-3 sm:bottom-4
                      z-[1000]
                      flex flex-col sm:flex-row gap-2 sm:items-center
                    "
                  >
                    <span className="pointer-events-auto text-xs text-slate-900/80 font-medium bg-white/85 rounded-full px-3 py-1 shadow">
                      Centered on:{" "}
                      <span className="font-semibold">
                        {selected?.name ?? "Unknown"}
                      </span>
                    </span>
                    <a
                      href={zoomEarthUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pointer-events-auto inline-flex items-center text-xs font-semibold bg-slate-900/95 text-slate-50 rounded-full px-3 py-1 shadow hover:bg-slate-800"
                    >
                      Open live map on Zoom Earth ↗
                    </a>
                  </div>

            </div>

            {/* RIGHT: city list */}
            <div className="space-y-3">
              {cities.map((city) => {
                const active = selected && selected.id === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityId(city.id)}
                    className={`w-full flex items-center justify-between rounded-3xl px-4 py-3 text-left transition-colors
                    ${
                      active
                        ? "bg-slate-800 border border-sky-500/70"
                        : "bg-slate-800/80 border border-transparent hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {getWeatherEmoji(city.weatherMain)}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{city.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {city.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      {tempPrimary(city.temp, settings)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapView;
