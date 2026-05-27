"use client";

/* ============ Helper Component: CycleNode ============ */

export function CycleNode({
  icon, label, sublabel, highlight, num,
}: {
  icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean; num?: string;
}) {
  return (
    <div className={`p-2 sm:p-3 rounded-xl border text-center w-[72px] sm:w-[120px] relative ${
      highlight ? "border-red-200 bg-red-50 shadow-lg shadow-red-100" : "border-[#E8E8ED] bg-[#F5F5F7]"
    }`}>
      {num && (
        <div className={`absolute -top-2 -right-2 size-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
          highlight ? "bg-red-500 text-white" : "bg-[#E8E8ED] text-[#6E6E73]"
        }`}>{num}</div>
      )}
      <div className={`flex justify-center mb-1 ${highlight ? "text-red-600" : "text-[#6E6E73]"}`}>{icon}</div>
      <p className={`font-semibold text-[10px] sm:text-xs leading-tight ${highlight ? "text-red-600" : ""}`}>{label}</p>
      <p className="text-[9px] sm:text-[10px] text-[#86868B] mt-0.5">{sublabel}</p>
    </div>
  );
}
