// src/components/SettingsView.jsx
import UnitToggle from "./ui/UnitToggle.jsx";
import ToggleSwitch from "./ui/ToggleSwitch.jsx";

function SettingsView({ settings, setSettings }) {
  return (
    <div className="w-full max-w-6xl">
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl px-6 py-7 md:px-8 md:py-9">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>

        <div className="grid gap-4 lg:grid-cols-[2fr,1.1fr]">
          {/* Units section – fully responsive / interactive */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-800/80 border border-white/5 px-4 py-4">
              <p className="text-xs font-semibold text-slate-300 tracking-wide mb-3">
                UNITS
              </p>

              <div className="space-y-3 text-sm">
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

            {/* simple notifications block but static */}
            <div className="rounded-2xl bg-slate-800/80 border border-white/5 px-4 py-4">
              <p className="text-xs font-semibold text-slate-300 tracking-wide mb-3">
                NOTIFICATIONS
              </p>
              <ToggleSwitch label="Weather alerts (UI only for now)" />
            </div>
          </div>

          {/* right column – just informational card */}
          <div className="rounded-2xl bg-slate-800/90 border border-white/5 px-4 py-5 text-sm">
            <p className="text-lg font-semibold mb-1">Advanced</p>
            <p className="text-slate-300 mb-4">
              Units you set on the left instantly update temperatures, wind and
              distances across all tabs.
            </p>
            <ul className="text-slate-300 text-xs space-y-1 mb-4">
              <li>• Celsius / Fahrenheit conversion is local only.</li>
              <li>• Wind speed converted from m/s.</li>
              <li>• Distances converted from kilometers.</li>
            </ul>
            <button className="mt-2 w-full rounded-xl bg-sky-500 py-2.5 font-medium hover:bg-sky-400">
              Soon to Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
