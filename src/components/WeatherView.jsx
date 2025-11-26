// src/components/WeatherView.jsx
import StatCard from "./ui/StatCard";
import SummaryRow from "./ui/SummaryRow";
import UnitToggle from "./ui/UnitToggle";

import {
  tempPrimary,
  tempSecondary,
  formatWind,
  formatDistance,
  formatTime,
  formatDay,
  getWeatherEmoji,
} from "../utils/weatherUtils";

function WeatherView({
  query,
  setQuery,
  handleKeyDown,
  handleSearch,
  weather,
  forecast,
  error,
  loading,
  today,
  settings,
  setSettings,
}) {

  return (
    <div className="w-full max-w-6xl">
      <div className="rounded-3xl bg-slate-900/75 border border-white/10 shadow-2xl backdrop-blur-xl px-6 py-7 md:px-8 md:py-9">
        {/* Top row: title + search */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Weather Check
            </h1>
            <p className="text-xs md:text-sm text-slate-300/80 mt-1 flex items-center gap-2">
              Check the current weather in any city
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search city (e.g. Manila, London)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 md:w-72 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5
                         text-sm md:text-base placeholder:text-slate-500
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`rounded-xl px-4 md:px-5 py-2.5 text-sm md:text-base font-medium
                          shadow-sm transition-colors
                          ${
                            loading
                              ? "bg-sky-400/60 cursor-not-allowed"
                              : "bg-sky-500 hover:bg-sky-400 active:bg-sky-600"
                          }`}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-rose-400 text-xs md:text-sm mb-3 text-center capitalize">
            {error}
          </p>
        )}

        {!weather && !error && (
          <p className="text-center text-sm md:text-base text-slate-300 mt-4">
            Start by searching for a city to see the weather details.
          </p>
        )}

        {weather && (
  <div className="mt-4 grid gap-5 lg:grid-cols-[2fr,1.3fr]">
    {/* LEFT: current weather & stats */}
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {weather.name}, {weather.sys?.country}
          </h2>
          <p className="text-xs md:text-sm text-slate-300/80 mt-1">
            {today}
          </p>
          <p className="text-sm text-slate-300 mt-2 capitalize">
            {weather.weather[0].main} · {weather.weather[0].description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl md:text-5xl font-semibold leading-tight">
            {tempPrimary(weather.main.temp, settings)}
          </p>
          <p className="text-xs md:text-sm text-slate-300">
            {tempSecondary(weather.main.temp, settings)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-2 text-xs md:text-sm">
        <StatCard
          label="Feels like"
          value={tempPrimary(weather.main.feels_like, settings)}
        />
        <StatCard
          label="Humidity"
          value={`${weather.main.humidity}%`}
        />
        <StatCard
          label="Wind"
          value={formatWind(weather.wind.speed, settings)}
        />
      </div>

      <div className="rounded-2xl bg-slate-800/70 border border-white/5 px-4 py-4 text-sm mt-3">
        <p className="text-xs font-semibold text-slate-300 tracking-wide mb-3">
          TODAY&apos;S SUMMARY
        </p>
        <SummaryRow
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
        />
        <SummaryRow
          label="Visibility"
          value={formatDistance((weather.visibility || 0) / 1000, settings)}
        />
        <SummaryRow
          label="Cloudiness"
          value={`${weather.clouds?.all ?? 0}%`}
        />
        {forecast && (
          <>
            <SummaryRow
              label="Sunrise"
              value={formatTime(
                forecast.current?.sunrise,
                forecast.timezone_offset
              )}
            />
            <SummaryRow
              label="Sunset"
              value={formatTime(
                forecast.current?.sunset,
                forecast.timezone_offset
              )}
            />
          </>
        )}
      </div>
    </div>

    {/* RIGHT column: Units + 7-day forecast */}
    <div className="space-y-4">
      {/* Units card */}
      <div className="rounded-2xl bg-slate-800/80 border border-white/5 px-4 py-4">
        <p className="text-xs font-semibold text-slate-300 tracking-wide mb-3">
          UNITS
        </p>
        <div className="space-y-3 text-xs md:text-sm">
          <UnitToggle
            label="Temperature"
            options={[
              { id: "celsius", label: "Celsius" },
              { id: "fahrenheit", label: "Fahrenheit" },
            ]}
            value={settings.tempUnit}
            onChange={(val) =>
              setSettings((prev) => ({ ...prev, tempUnit: val }))
            }
          />

          <UnitToggle
            label="Wind speed"
            options={[
              { id: "kmh", label: "km/h" },
              { id: "ms", label: "m/s" },
              { id: "mph", label: "mph" },
            ]}
            value={settings.windUnit}
            onChange={(val) =>
              setSettings((prev) => ({ ...prev, windUnit: val }))
            }
          />

          <UnitToggle
            label="Distance"
            options={[
              { id: "km", label: "Kilometers" },
              { id: "mi", label: "Miles" },
            ]}
            value={settings.distanceUnit}
            onChange={(val) =>
              setSettings((prev) => ({ ...prev, distanceUnit: val }))
            }
          />
        </div>
      </div>

      {/* 7-day forecast card */}
      <div className="rounded-2xl bg-slate-800/80 border border-white/5 px-4 py-4">
        <p className="text-xs font-semibold text-slate-300 tracking-wide mb-3">
          7-DAY FORECAST
        </p>

        {forecast && forecast.daily && forecast.daily.length > 0 ? (
          <div className="space-y-2">
            {forecast.daily.slice(0, 7).map((day, idx) => {
              const main = day.weather[0].main;
              const desc = day.weather[0].description;

              return (
                <div
                  key={day.dt}
                  className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-none"
                >
                  {/* Day name */}
                  <span className="w-12 text-xs text-slate-400">
                    {idx === 0
                      ? "Today"
                      : formatDay(day.dt, forecast.timezone_offset)}
                  </span>

                  {/* Icon + text */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-lg">
                      {getWeatherEmoji(main)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-100 capitalize">
                        {main}
                      </span>
                      <span className="text-[11px] text-slate-400 capitalize">
                        {desc}
                      </span>
                    </div>
                  </div>

                  {/* Max / min */}
                  <div className="text-xs md:text-sm text-slate-100">
                    {tempPrimary(day.temp.max, settings)}
                    <span className="text-slate-400">
                      {" "}
                      / {tempPrimary(day.temp.min, settings)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            7-day forecast will appear here after a successful search.
          </p>
        )}
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default WeatherView;
