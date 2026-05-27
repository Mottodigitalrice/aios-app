"use client";

/* ============ Helper Component: LoopStep ============ */

export function LoopStep({
  icon, label, sublabel, highlight,
}: {
  icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center p-3 rounded-xl border min-w-[70px] sm:min-w-[85px] ${
      highlight ? "border-[#B8860B]/20 bg-[#B8860B]/5" : "border-[#E8E8ED] bg-[#F5F5F7]"
    }`}>
      <div className={highlight ? "text-[#B8860B]" : "text-[#6E6E73]"}>{icon}</div>
      <p className={`text-xs font-semibold mt-1 ${highlight ? "text-[#B8860B]" : ""}`}>{label}</p>
      <p className="text-[10px] text-[#86868B]">{sublabel}</p>
    </div>
  );
}
