import React from "react";
import { Camera, Check } from "lucide-react";

export default function QuestionField({ question, answers, onChange, onOpenCamera, depth = 0 }) {
  const value = answers[question.id];

  return (
    <div style={{ paddingLeft: depth ? 16 : 0 }}>
      <div className="flex items-start gap-3 py-3">
        <span
          className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
            isFilled(question, value) ? "bg-accent" : "bg-gray-300"
          }`}
        />
        <div className="flex-1 flex items-center justify-between gap-3 flex-wrap">
          <label className="text-sm font-semibold text-gray-800">
            {question.label}
            {question.required && <span className="text-red-500"> *</span>}
          </label>

          {question.type === "toggle" && (
            <div className="flex rounded-full overflow-hidden border border-gray-200 shrink-0">
              <button
                type="button"
                onClick={() => onChange(question.id, "no")}
                className={`toggle-btn px-4 py-1.5 text-sm font-semibold ${
                  value === "no" ? "bg-gray-400 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => onChange(question.id, "yes")}
                className={`toggle-btn px-4 py-1.5 text-sm font-semibold ${
                  value === "yes" ? "bg-accent text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                Yes
              </button>
            </div>
          )}

          {question.type === "photo" && (
            <div className="flex items-center gap-2 shrink-0">
              {value && (
                <img
                  src={value}
                  alt=""
                  className="w-9 h-9 rounded-md object-cover border border-gray-200"
                />
              )}
              <button
                type="button"
                onClick={() => onOpenCamera(question.id)}
                aria-label={`Capture ${question.label}`}
                className="w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 active:bg-gray-50"
              >
                {value ? <Check size={16} className="text-accent" /> : <Camera size={16} />}
              </button>
            </div>
          )}

          {(question.type === "text" || question.type === "number") && (
            <input
              type={question.type === "number" ? "number" : "text"}
              inputMode={question.inputMode}
              value={value || ""}
              onChange={(e) => onChange(question.id, e.target.value)}
              placeholder="Type"
              className="w-full border-b border-gray-300 text-sm py-1.5 focus:border-brand-400 bg-transparent"
            />
          )}
        </div>
      </div>

      {question.children && value === "yes" && (
        <div className="border-l-2 border-gray-100 ml-1">
          {question.children.map((child) => (
            <QuestionField
              key={child.id}
              question={child}
              answers={answers}
              onChange={onChange}
              onOpenCamera={onOpenCamera}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function isFilled(q, value) {
  if (value === undefined || value === null || value === "") return false;
  if (q.type === "toggle") return value === "yes" || value === "no";
  return true;
}
