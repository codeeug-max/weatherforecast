export default function ToggleSwitch({ label }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-300 text-xs md:text-sm">{label}</span>
      <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-sky-500">
        <span className="inline-block h-5 w-5 translate-x-0.5 rounded-full bg-white" />
      </span>
    </label>
  );
}
