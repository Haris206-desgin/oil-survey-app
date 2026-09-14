import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title, onBack, right = null }) {
  const navigate = useNavigate();
  return (
    <div className="bg-brand-500 text-white px-4 pt-4 pb-4 flex items-center gap-3 shrink-0">
      {onBack !== undefined && (
        <button
          aria-label="Go back"
          onClick={() => (onBack ? onBack() : navigate(-1))}
          className="p-1 -ml-1 rounded-full active:bg-white/10"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="text-lg font-semibold flex-1 truncate">{title}</h1>
      {right}
    </div>
  );
}
