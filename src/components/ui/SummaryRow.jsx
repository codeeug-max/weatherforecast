// src/components/ui/SummaryRow.jsx
export default function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-slate-300/80 text-xs md:text-sm">{label}</span>
      <span className="font-medium text-slate-50 text-xs md:text-sm">
        {value}
      </span>
    </div>
  );
}
