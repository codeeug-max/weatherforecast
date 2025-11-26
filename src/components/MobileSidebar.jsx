// src/components/MobileSidebar.jsx
function MobileSidebar({ open, setOpen, activeTab, setActiveTab, logo }) {
  if (!open) return null;

        const items = [
        { id: "weather", label: "Weather", icon: "🌤️" },
        { id: "cities", label: "Cities", icon: "📋" },
        { id: "map", label: "Map", icon: "🗺️" },
        { id: "theme", label: "Theme", icon: "🎨" },
        ];


  const handleClick = (id) => {
    setActiveTab(id);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />
      {/* panel */}
      <div className="relative h-full w-64 bg-slate-950 border-r border-slate-800 px-4 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-sky-500 text-xl">
              {logo}
            </div>
            <span className="text-sm font-semibold text-slate-50">
              Weather App
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-300 hover:text-slate-50"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {items.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
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
      </div>
    </div>
  );
}

export default MobileSidebar;
