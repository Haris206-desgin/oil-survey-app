import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { api } from "../lib/api.js";
import TopBar from "../components/TopBar.jsx";
import { formatTime, formatDuration } from "../lib/questions.js";

export default function SiteHistory() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .siteVisits(siteId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [siteId]);

  return (
    <div className="app-shell">
      <TopBar title={`${data?.site?.name || "Site"} History`} />
      <div className="scroll-area px-5 py-4">
        {loading && <p className="text-sm text-gray-400 text-center py-8">Loading…</p>}

        {!loading && data?.visits.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No visits recorded yet.</p>
        )}

        <div className="space-y-2.5">
          {!loading &&
            data?.visits.map((v) => (
              <button
                key={v.id}
                onClick={() => navigate(`/visit/${v.id}`)}
                className="w-full flex items-center justify-between rounded-2xl border border-gray-100 bg-white shadow-card px-4 py-3.5 active:bg-gray-50"
              >
                <span className="font-semibold text-gray-800 text-sm">{v.label}</span>
                <span className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {formatDuration(v.durationSeconds)}
                  </span>
                  <span className="font-medium text-gray-500">{formatTime(v.submittedAt)}</span>
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
