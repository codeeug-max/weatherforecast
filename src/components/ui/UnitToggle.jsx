export default function UnitToggle({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-slate-300 mb-1 text-xs md:text-sm">{label}</p>
      <div className="flex rounded-xl bg-slate-900/70 border border-slate-700 overflow-hidden text-xs">
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`flex-1 py-1.5 px-2 transition-colors
              ${
                active
                  ? "bg-slate-700 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
