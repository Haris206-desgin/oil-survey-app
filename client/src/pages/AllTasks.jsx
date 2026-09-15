// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, History } from "lucide-react";
// import { api } from "../lib/api.js";
// import TopBar from "../components/TopBar.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function AllTasks() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .surveyTypes()
//       .then((d) => setCategories(d.categories))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="app-shell">
//       <TopBar title="All Tasks" />
//       <div className="scroll-area px-5 py-4 pb-24">
//         {loading && <p className="text-sm text-gray-400 text-center py-8">Loading…</p>}
//         {!loading &&
//           categories.map((cat) => (
//             <div key={cat.id} className="mb-5">
//               <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 px-1">
//                 {cat.name}
//               </p>
//               <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//                 {cat.types.map((t) => (
//                   <button
//                     key={t.id}
//                     onClick={() => navigate(`/survey/${t.slug}`)}
//                     className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-b-0 active:bg-gray-50"
//                   >
//                     <div className="text-left">
//                       <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
//                       <p className="text-xs text-gray-400 mt-0.5">
//                         {t.pendingCount} pending · {t.completedCount} done today
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {t.hasHistory && <History size={16} className="text-gray-400" />}
//                       <ChevronRight size={18} className="text-gray-300" />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>
//       <BottomNav />
//     </div>
//   );
// }












// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, History } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import TopBar from "../components/TopBar.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function AllTasks() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pendingCounts, setPendingCounts] = useState({});

//   // Read User-Specific Pending Surveys from LocalStorage
//   const loadPendingCounts = useCallback(() => {
//     const activeUserId = user?.id || user?._id || user?.userId || "guest_user";
//     const storageKey = `pending_surveys_${activeUserId}`;
//     const userSurveys = JSON.parse(localStorage.getItem(storageKey) || "[]");

//     const counts = {};
//     userSurveys.forEach((item) => {
//       const slug = item.surveyTypeSlug;
//       counts[slug] = (counts[slug] || 0) + 1;
//     });
//     setPendingCounts(counts);
//   }, [user]);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .surveyTypes()
//       .then((d) => {
//         setCategories(d.categories || []);
//         loadPendingCounts();
//       })
//       .finally(() => setLoading(false));
//   }, [loadPendingCounts]);

//   return (
//     <div className="app-shell">
//       <TopBar title="All Tasks" />
//       <div className="scroll-area px-5 py-4 pb-24">
//         {loading && <p className="text-sm text-gray-400 text-center py-8">Loading…</p>}
//         {!loading &&
//           categories.map((cat) => (
//             <div key={cat.id} className="mb-5">
//               <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 px-1">
//                 {cat.name}
//               </p>
//               <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//                 {cat.types.map((t) => {
//                   const dynamicPending = pendingCounts[t.slug] || 0;
//                   return (
//                     <button
//                       key={t.id}
//                       onClick={() => navigate(`/survey/${t.slug}`)}
//                       className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-b-0 active:bg-gray-50"
//                     >
//                       <div className="text-left">
//                         <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           {dynamicPending} pending · {t.completedCount || 0} done today
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {t.hasHistory && <History size={16} className="text-gray-400" />}
//                         <ChevronRight size={18} className="text-gray-300" />
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//       </div>
//       <BottomNav />
//     </div>
//   );
// }








import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, History } from "lucide-react";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/auth.jsx";
import TopBar from "../components/TopBar.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function AllTasks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [surveyStats, setSurveyStats] = useState({});

  // Read User-Specific Pending and Completed Surveys
  const loadUserStats = useCallback(() => {
    const activeUserId = user?.id || user?._id || user?.userId || "guest_user";
    const storageKey = `pending_surveys_${activeUserId}`;
    const userSurveys = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const todayStr = new Date().toISOString().split("T")[0];
    const stats = {};

    userSurveys.forEach((item) => {
      const slug = item.surveyTypeSlug;
      if (!stats[slug]) {
        stats[slug] = { pending: 0, doneToday: 0 };
      }
      
      stats[slug].pending += 1;

      // Check if entry was created today
      if (item.submittedAt && item.submittedAt.startsWith(todayStr)) {
        stats[slug].doneToday += 1;
      }
    });

    setSurveyStats(stats);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    api
      .surveyTypes()
      .then((d) => {
        setCategories(d.categories || []);
        loadUserStats();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [loadUserStats]);

  return (
    <div className="app-shell">
      <TopBar title="All Tasks" />
      <div className="scroll-area px-5 py-4 pb-24">
        {loading && <p className="text-sm text-gray-400 text-center py-8">Loading…</p>}
        {!loading &&
          categories.map((cat) => (
            <div key={cat.id} className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2 px-1">
                {cat.name}
              </p>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
                {cat.types.map((t) => {
                  const currentStat = surveyStats[t.slug] || { pending: 0, doneToday: 0 };
                  return (
                    <button
                      key={t.id}
                      onClick={() => navigate(`/survey/${t.slug}`)}
                      className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-b-0 active:bg-gray-50"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {currentStat.pending} pending · {currentStat.doneToday} done today
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {t.hasHistory && <History size={16} className="text-gray-400" />}
                        <ChevronRight size={18} className="text-gray-300" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
      <BottomNav />
    </div>
  );
}




