import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, History, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api.js";
import TopBar from "../components/TopBar.jsx";
import { formatDateTime } from "../lib/questions.js";

export default function SiteList() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [surveyType, setSurveyType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .surveyType(slug)
      .then(setSurveyType)
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="app-shell">
      <TopBar title={surveyType?.name || "Sites"} onBack={null} />
      <div className="scroll-area px-5 py-4 pb-10">
        {loading && <p className="text-sm text-gray-400 text-center py-8">Loading sites…</p>}

        {!loading && surveyType?.sites.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No sites assigned yet.</p>
        )}

        <div className="space-y-3">
          {!loading &&
            surveyType?.sites.map((site) => (
              <div
                key={site.id}
                className="rounded-2xl border border-gray-100 bg-white shadow-card p-4"
              >
                <div className="flex items-start gap-2 mb-1">
                  <MapPin size={16} className="text-brand-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{site.name}</p>
                    <p className="text-xs text-gray-400">{site.address}</p>
                  </div>
                </div>

                {site.visitedToday && (
                  <p className="flex items-center gap-1 text-accent text-xs font-medium mt-2">
                    <CheckCircle2 size={14} /> Visited today
                    {site.lastVisitAt ? ` · ${formatDateTime(site.lastVisitAt)}` : ""}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/survey/${slug}/site/${site.id}`)}
                    className="flex-1 bg-accent text-white text-sm font-semibold rounded-xl py-2.5 active:bg-accent-dark"
                  >
                    {site.visitedToday ? "Visit Again" : "Start Survey"}
                  </button>
                  {site.visitCount > 0 && (
                    <button
                      onClick={() => navigate(`/survey/${slug}/site/${site.id}/history`)}
                      aria-label="View history"
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 active:bg-gray-50"
                    >
                      <History size={17} />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
