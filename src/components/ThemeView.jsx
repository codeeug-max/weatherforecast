// src/components/ThemeView.jsx

const singleOptions = [
  { id: "blue", label: "Midnight Blue", className: "bg-slate-950" },
  { id: "purple", label: "Deep Purple", className: "bg-violet-950" },
  { id: "green", label: "Emerald", className: "bg-emerald-950" },
  { id: "orange", label: "Amber", className: "bg-amber-950" },
];

const gradientOptions = [
  {
    id: "blue",
    label: "Blue Night",
    className: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
  },
  {
    id: "purple",
    label: "Purple Glow",
    className:
      "bg-gradient-to-br from-violet-900 via-slate-950 to-violet-950",
  },
  {
    id: "green",
    label: "Aurora Green",
    className:
      "bg-gradient-to-br from-emerald-900 via-slate-950 to-emerald-950",
  },
  {
    id: "orange",
    label: "Warm Sunset",
    className:
      "bg-gradient-to-br from-amber-900 via-slate-950 to-amber-950",
  },
];

function ThemeView({ theme, setTheme, setActiveTab }) {
  /** change only the mode (single / gradient) */
  const setMode = (mode) => {
    setTheme((prev) => ({ ...prev, mode }));
  };

  /** pick a specific mode + color, then return to Weather tab */
  const handlePick = (mode, color) => {
    setTheme((prev) => ({ ...prev, mode, color }));
    setActiveTab("weather"); // go back home after choosing
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl px-6 py-7 md:px-8 md:py-9">
        <h2 className="text-2xl font-semibold mb-2">Theme mode</h2>
        <p className="text-sm text-slate-300 mb-5">
          Choose how the background of your dashboard looks.
        </p>

        {/* Mode toggle */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-300 mb-2">MODE</p>
          <div className="inline-flex rounded-xl bg-slate-900/70 border border-slate-700 overflow-hidden text-xs">
            <button
              onClick={() => setMode("single")}
              className={`px-4 py-2 ${
                theme.mode === "single"
                  ? "bg-slate-700 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Single color
            </button>
            <button
              onClick={() => setMode("gradient")}
              className={`px-4 py-2 ${
                theme.mode === "gradient"
                  ? "bg-slate-700 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Gradient
            </button>
          </div>
        </div>

        {/* Color options */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Single color */}
          <div>
            <p className="text-xs font-semibold text-slate-300 mb-3">
              SINGLE COLORS
            </p>
            <div className="grid grid-cols-2 gap-3">
              {singleOptions.map((opt) => {
                const active = theme.mode === "single" && theme.color === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handlePick("single", opt.id)}
                    className={`relative h-20 rounded-2xl border overflow-hidden text-left px-3 py-2
                    ${
                      active
                        ? "border-sky-400"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 ${opt.className} opacity-80`}
                    />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <span className="text-xs font-medium text-slate-50">
                        {opt.label}
                      </span>
                      {active && (
                        <span className="text-[11px] text-sky-200">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gradients */}
          <div>
            <p className="text-xs font-semibold text-slate-300 mb-3">
              GRADIENTS
            </p>
            <div className="grid grid-cols-2 gap-3">
              {gradientOptions.map((opt) => {
                const active =
                  theme.mode === "gradient" && theme.color === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handlePick("gradient", opt.id)}
                    className={`relative h-20 rounded-2xl border overflow-hidden text-left px-3 py-2
                    ${
                      active
                        ? "border-sky-400"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 ${opt.className} opacity-90`}
                    />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <span className="text-xs font-medium text-slate-50">
                        {opt.label}
                      </span>
                      {active && (
                        <span className="text-[11px] text-sky-200">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeView;
