// src/App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

import WeatherView from "./components/WeatherView";
import CitiesView from "./components/CitiesView";
import MapView from "./components/MapView";
import SettingsView from "./components/SettingsView";
import ThemeView from "./components/ThemeView";

const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY || "124d778071f98e42265851f1c342ba6e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // 7-day
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("weather"); // weather | cities | map | settings | theme

  // global list of cities that user searched
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);

  // global units/settings
  const [settings, setSettings] = useState({
    tempUnit: "celsius", // celsius | fahrenheit
    windUnit: "ms", // ms | kmh | mph
    distanceUnit: "km", // km | mi
  });

  // theme settings
  const [theme, setTheme] = useState({
    mode: "gradient", // "single" | "gradient"
    color: "blue", // "blue" | "purple" | "green" | "orange"
  });

  // mobile dropdown open/close
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setError("");
      setLoading(true);

      const url = `${api.base}weather?q=${encodeURIComponent(
        query
      )}&units=metric&appid=${api.key}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setWeather(null);
        setForecast(null);
        setError(data.message || "Something went wrong");
        return;
      }

      setWeather(data);
      setSelectedCityId(data.id);

      // Add / update in global cities list
      const entry = {
        id: data.id,
        name: data.name,
        country: data.sys?.country,
        temp: data.main.temp,
        weatherMain: data.weather[0].main,
        weatherDesc: data.weather[0].description,
        time: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        data,
      };

      setCities((prev) => {
        const filtered = prev.filter((c) => c.id !== entry.id);
        return [entry, ...filtered].slice(0, 8); // keep most recent first
      });

      // Fetch 7-day forecast for this city
      fetchForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      console.error(err);
      setWeather(null);
      setForecast(null);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api.key}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setForecast(data);
      } else {
        setForecast(null);
        console.warn("Forecast error", data);
      }
    } catch (err) {
      console.error(err);
      setForecast(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const getSidebarLogo = () => {
    if (!weather) return "🌍";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("rain") || main.includes("drizzle") || main.includes("thunder"))
      return "☔";
    if (main.includes("clear")) return "🌍";
    return "🌍";
  };

  // BACKGROUND PICKER BASED ON THEME
  const getBackground = () => {
    if (theme.mode === "single") {
      switch (theme.color) {
        case "purple":
          return "bg-violet-950";
        case "green":
          return "bg-emerald-950";
        case "orange":
          return "bg-amber-950";
        case "blue":
        default:
          return "bg-slate-950";
      }
    }
    // gradient
    switch (theme.color) {
      case "purple":
        return "from-violet-900 via-slate-950 to-violet-950";
      case "green":
        return "from-emerald-900 via-slate-950 to-emerald-950";
      case "orange":
        return "from-amber-900 via-slate-950 to-amber-950";
      case "blue":
      default:
        return "from-slate-950 via-slate-900 to-slate-950";
    }
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const logo = getSidebarLogo();

  return (
  <div
    className={`min-h-screen ${
      theme.mode === "gradient" ? "bg-gradient-to-br" : ""
    } ${getBackground()} text-slate-50`}
  >
    {/* Center the whole dashboard card */}
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-8 py-4">
      <div
        className="
          w-full max-w-6xl lg:max-w-7xl
          flex flex-col md:flex-row
          rounded-[32px]
          bg-slate-950/85
          border border-white/10
          shadow-[0_24px_80px_rgba(15,23,42,0.9)]
          overflow-hidden
        "
      >
        {/* Desktop sidebar (inside the card) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logo={logo}
        />

        {/* Right side: mobile header + content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile top bar – stays inside card */}
          <MobileHeader
            logo={logo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />

          <main className="flex-1 flex justify-center items-center px-3 sm:px-6 lg:px-8 py-6">
            {activeTab === "weather" && (
              <WeatherView
                query={query}
                setQuery={setQuery}
                handleKeyDown={handleKeyDown}
                handleSearch={handleSearch}
                weather={weather}
                forecast={forecast}
                error={error}
                loading={loading}
                today={today}
                settings={settings}
                setSettings={setSettings}
              />
            )}

            {activeTab === "cities" && (
              <CitiesView
                cities={cities}
                selectedCityId={selectedCityId}
                setSelectedCityId={setSelectedCityId}
                weather={weather}
                forecast={forecast}
                settings={settings}
              />
            )}

            {activeTab === "map" && (
              <MapView
                cities={cities}
                selectedCityId={selectedCityId}
                setSelectedCityId={setSelectedCityId}
                settings={settings}
              />
            )}

            {/* {activeTab === "settings" && (
              <SettingsView settings={settings} setSettings={setSettings} />
            )} */}

            {activeTab === "theme" && (
              <ThemeView
                theme={theme}
                setTheme={setTheme}
                setActiveTab={setActiveTab}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  </div>
);

}

export default App;
