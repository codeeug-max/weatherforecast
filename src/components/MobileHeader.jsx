// src/components/MobileHeader.jsx

const items = [
  { id: "weather", label: "Weather", icon: "🌤️" },
  { id: "cities", label: "Cities", icon: "📋" },
  { id: "map", label: "Map", icon: "🗺️" },
  { id: "settings", label: "Settings", icon: "⚙️" },
  { id: "theme", label: "Theme", icon: "🎨" },
];

function MobileHeader({ logo, activeTab, setActiveTab, menuOpen, setMenuOpen }) {
  const handleSelect = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <header className="relative flex md:hidden items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-sky-500 text-xl">
          {logo}
        </div>
        <div className="text-sm leading-tight">
          <p className="text-[10px] text-slate-400">Live</p>
          <p className="font-semibold text-slate-50">Weather Dashboard</p>
        </div>
      </div>

      {/* Hamburger button: ONLY 3 LINES, no text */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="rounded-lg border border-slate-700 p-1.5 text-slate-100"
      >
        <div className="space-y-1">
          <span className="block h-0.5 w-5 bg-slate-100" />
          <span className="block h-0.5 w-5 bg-slate-100" />
          <span className="block h-0.5 w-5 bg-slate-100" />
        </div>
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute right-4 top-12 z-30 w-44 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-xl py-2">
          {items.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left
                ${
                  active
                    ? "bg-slate-800 text-sky-100"
                    : "text-slate-200 hover:bg-slate-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default MobileHeader;
