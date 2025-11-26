// src/components/Sidebar.jsx
function Sidebar({ activeTab, setActiveTab, logo }) {
  const items = [
  { id: "weather", label: "Weather", icon: "🌤️" },
  { id: "cities", label: "Cities", icon: "📋" },
  { id: "map", label: "Map", icon: "🗺️" },
  { id: "theme", label: "Theme", icon: "🎨" },
];


  return (
    <aside
      className="
        hidden md:flex flex-col
        w-60 xl:w-64
        bg-slate-950/95
        border-r border-slate-800/70
        px-4 py-6
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/90 text-2xl shadow-lg">
          {logo}
        </div>
        <div className="leading-tight">
          <p className="text-xs text-slate-400">Live</p>
          <p className="text-sm font-semibold text-slate-50">
            Weather Dashboard
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {items.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors
               ${
                 active
                   ? "bg-slate-800 border border-sky-500/60 text-sky-100 shadow-md"
                   : "text-slate-300 hover:bg-slate-900/70"
               }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <p className="mt-6 text-[10px] text-slate-500">
        Search a city on the Weather tab to populate Cities &amp; Map.
      </p>
    </aside>
  );
}

export default Sidebar;
