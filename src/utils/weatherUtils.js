// src/utils/weatherUtils.js

export const toFahrenheit = (c) => (c * 9) / 5 + 32;
export const toKmh = (v) => v * 3.6;
export const toMph = (v) => v * 2.23694;
export const toMiles = (km) => km * 0.621371;

export function tempPrimary(c, settings) {
  if (c == null) return "-";
  if (settings.tempUnit === "celsius") return `${Math.round(c)}°C`;
  return `${Math.round(toFahrenheit(c))}°F`;
}

export function tempSecondary(c, settings) {
  if (c == null) return "";
  if (settings.tempUnit === "celsius")
    return `${Math.round(toFahrenheit(c))}°F`;
  return `${Math.round(c)}°C`;
}

export function formatWind(speedMs, settings) {
  if (speedMs == null) return "-";
  if (settings.windUnit === "kmh")
    return `${Math.round(toKmh(speedMs))} km/h`;
  if (settings.windUnit === "mph")
    return `${Math.round(toMph(speedMs))} mph`;
  return `${Math.round(speedMs)} m/s`;
}

export function formatDistance(km, settings) {
  if (km == null) return "-";
  if (settings.distanceUnit === "mi")
    return `${toMiles(km).toFixed(1)} mi`;
  return `${km.toFixed(1)} km`;
}

export function formatTime(unixSeconds, timezoneOffset) {
  if (!unixSeconds || timezoneOffset == null) return "-";
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDay(unixSeconds, timezoneOffset) {
  if (!unixSeconds || timezoneOffset == null) return "-";
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

export function getWeatherEmoji(main) {
  if (!main) return "🌤️";
  const m = main.toLowerCase();
  if (m.includes("cloud")) return "☁️";
  if (m.includes("rain") || m.includes("drizzle")) return "🌧️";
  if (m.includes("thunder")) return "⛈️";
  if (m.includes("snow")) return "❄️";
  if (m.includes("clear")) return "☀️";
  return "🌤️";
}
