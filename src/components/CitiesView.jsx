// src/components/CitiesView.jsx
import {
  tempPrimary,
  formatDay,
  getWeatherEmoji,
} from "../utils/weatherUtils";

function CitiesView({
  cities,
  selectedCityId,
  setSelectedCityId,
  weather,
  forecast,
  settings,
}) {
  const selected =
    cities.find((c) => c.id === selectedCityId) || cities[0] || null;

  return (
    <div className="w-full max-w-6xl">
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl px-6 py-7 md:px-8 md:py-9">
        <h2 className="text-2xl font-semibold mb-4">Cities</h2>

        {cities.length === 0 && (
          <p className="text-sm text-slate-300">
            No cities yet. Search some cities on the <b>Weather</b> tab and they
            will show up here.
          </p>
        )}

        {cities.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-[1.6fr,1.2fr]">
            {/* city list */}
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
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-2xl">
                        {getWeatherEmoji(city.weatherMain)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          {city.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {city.time || "--:--"}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg md:text-2xl font-semibold">
                      {tempPrimary(city.temp, settings)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* detail panel */}
            <div className="rounded-3xl bg-slate-800/80 border border-white/10 px-5 py-5 text-sm">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xl md:text-2xl font-semibold">
                        {selected.name}, {selected.country}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Last updated: {selected.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-4xl">
                        {getWeatherEmoji(selected.weatherMain)}
                      </span>
                      <span className="mt-1 text-lg font-semibold">
                        {tempPrimary(selected.temp, settings)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 capitalize">
                    {selected.weatherMain} · {selected.weatherDesc}
                  </p>

                  <div className="border-t border-slate-700/80 pt-3 mt-3">
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      3-DAY FORECAST
                    </p>
                    {forecast && weather && weather.id === selected.id ? (
                      <div className="space-y-1">
                        {forecast.daily.slice(0, 3).map((day, idx) => (
                          <div
                            key={day.dt}
                            className="flex items-center justify-between py-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-12 text-xs text-slate-400">
                                {idx === 0
                                  ? "Today"
                                  : formatDay(day.dt, forecast.timezone_offset)}
                              </span>
                              <span className="text-lg">
                                {getWeatherEmoji(day.weather[0].main)}
                              </span>
                              <span className="text-xs text-slate-200 capitalize">
                                {day.weather[0].main}
                              </span>
                            </div>
                            <div className="text-xs text-slate-100">
                              {tempPrimary(day.temp.max, settings)}
                              <span className="text-slate-400">
                                {" "}
                                / {tempPrimary(day.temp.min, settings)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">
                        3-day forecast available after you open this city on the{" "}
                        <b>Weather</b> tab.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-300">
                  Select a city from the list to see details.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CitiesView;
