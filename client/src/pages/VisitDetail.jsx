import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api.js";
import TopBar from "../components/TopBar.jsx";
import { formatDateTime, formatDuration } from "../lib/questions.js";

function ReadOnlyRow({ question, answers, depth = 0 }) {
  const value = answers[question.id];
  if (value === undefined && !question.children) return null;

  return (
    <div style={{ paddingLeft: depth ? 16 : 0 }}>
      <div className="flex items-center justify-between py-2.5 gap-3">
        <span className="text-sm text-gray-500">{question.label}</span>
        {question.type === "toggle" && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              value === "yes" ? "bg-accent-light text-accent-dark" : "bg-gray-100 text-gray-500"
            }`}
          >
            {value === "yes" ? "Yes" : value === "no" ? "No" : "—"}
          </span>
        )}
        {question.type === "photo" &&
          (value ? (
            <img src={value} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
          ) : (
            <span className="text-xs text-gray-300">—</span>
          ))}
        {(question.type === "text" || question.type === "number") && (
          <span className="text-sm font-medium text-gray-800 text-right">{value || "—"}</span>
        )}
      </div>
      {question.children && value === "yes" && (
        <div className="border-l-2 border-gray-100 ml-1">
          {question.children.map((c) => (
            <ReadOnlyRow key={c.id} question={c} answers={answers} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function VisitDetail() {
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .visit(id)
      .then(setVisit)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="app-shell">
      <TopBar title={visit?.surveyType?.name || "Visit"} />
      <div className="scroll-area px-5 py-4">
        {loading && <p className="text-sm text-gray-400 text-center py-8">Loading…</p>}

        {!loading && visit && (
          <>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-card px-4 py-3.5 mb-4">
              <p className="font-semibold text-gray-800 text-sm">{visit.site?.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDateTime(visit.submittedAt)} · {formatDuration(visit.durationSeconds)} spent
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-card px-4 divide-y divide-gray-50">
              {visit.surveyType.questions.map((q) => (
                <ReadOnlyRow key={q.id} question={q} answers={visit.answers} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
