// src/components/ui/StatCard.jsx
export default function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-800/70 px-3 py-3 text-center border border-white/5">
      <p className="text-slate-400 mb-1 text-xs">{label}</p>
      <p className="text-base md:text-lg font-medium">{value}</p>
    </div>
  );
}
