// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   History,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [syncedAt, setSyncedAt] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const load = useCallback(async () => {
//     const data = await api.surveyTypes();
//     setCategories(data.categories);
//     setExpanded((prev) => {
//       if (Object.keys(prev).length) return prev;
//       const initial = {};
//       data.categories.forEach((c, i) => (initial[c.id] = i === 0));
//       return initial;
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     load().finally(() => setLoading(false));
//   }, [load]);

//   async function handleSync() {
//     setSyncing(true);
//     try {
//       await load();
//       setSyncedAt(new Date());
//     } finally {
//       setSyncing(false);
//     }
//   }

//   return (
//     <div className="app-shell">
//       <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-brand-100 text-sm">Welcome,</p>
//             <p className="text-xl font-bold">{user?.name}</p>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-1.5 rounded-lg active:bg-white/10"
//               aria-label="Menu"
//             >
//               <Menu size={22} />
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
//                 >
//                   <LogOut size={16} /> Log out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="scroll-area px-5 -mt-2 pb-24">
//         <div className="flex items-center justify-between mt-4 mb-3">
//           <div className="flex items-center gap-2">
//             <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
//               <ClipboardList size={18} />
//             </span>
//             <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
//           </div>
//           <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
//             View All
//           </Link>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
//             Loading tasks…
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//             {categories.map((cat) => {
//               const isOpen = !!expanded[cat.id];
//               return (
//                 <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
//                   <button
//                     onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
//                     className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
//                   >
//                     <span className="font-semibold text-gray-800">{cat.name}</span>
//                     <span className="flex items-center gap-2">
//                       <span className="text-gray-500 text-sm">({cat.total})</span>
//                       {isOpen ? (
//                         <ChevronUp size={18} className="text-gray-400" />
//                       ) : (
//                         <ChevronDown size={18} className="text-gray-400" />
//                       )}
//                     </span>
//                   </button>

//                   {isOpen &&
//                     cat.types.map((t) => (
//                       <div
//                         key={t.id}
//                         className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
//                       >
//                         <button
//                           onClick={() => navigate(`/survey/${t.slug}`)}
//                           className="text-left flex-1 text-gray-600 text-sm"
//                         >
//                           {t.name}
//                         </button>
//                         <div className="flex items-center gap-3">
//                           {t.hasHistory && (
//                             <History
//                               size={16}
//                               className="text-gray-400"
//                               onClick={() => navigate(`/survey/${t.slug}`)}
//                             />
//                           )}
//                           <span className="text-gray-500 text-sm w-6 text-right">
//                             ({t.completedCount})
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               );
//             })}
//             <Link
//               to="/tasks"
//               className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
//             >
//               View more Tasks
//             </Link>
//           </div>
//         )}

//         {syncedAt && (
//           <p className="text-center text-xs text-gray-400 mt-4">
//             Last synced {syncedAt.toLocaleTimeString()}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={handleSync}
//         disabled={syncing}
//         className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60"
//       >
//         <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
//         Sync
//       </button>

//       <BottomNav />
//     </div>
//   );
// }















































// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   History,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [syncedAt, setSyncedAt] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Confirmation Modal State
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const load = useCallback(async () => {
//     const data = await api.surveyTypes();
//     setCategories(data.categories);
//     setExpanded((prev) => {
//       if (Object.keys(prev).length) return prev;
//       const initial = {};
//       data.categories.forEach((c, i) => (initial[c.id] = i === 0));
//       return initial;
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     load().finally(() => setLoading(false));
//   }, [load]);

//   async function handleSync() {
//     setSyncing(true);
//     try {
//       await load();
//       setSyncedAt(new Date());
//     } finally {
//       setSyncing(false);
//     }
//   }

//   // Task click par modal open karne ka handler
//   const handleItemClick = (task) => {
//     setSelectedTask(task);
//     setShowModal(true);
//   };

//   // Modal me 'Yes' click par navigate karne ka handler
//   const handleConfirmVisit = () => {
//     if (selectedTask) {
//       setShowModal(false);
//       navigate(`/survey/${selectedTask.slug}`);
//     }
//   };

//   return (
//     <div className="app-shell relative">
//       <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-brand-100 text-sm">Welcome,</p>
//             <p className="text-xl font-bold">{user?.name}</p>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-1.5 rounded-lg active:bg-white/10"
//               aria-label="Menu"
//             >
//               <Menu size={22} />
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
//                 >
//                   <LogOut size={16} /> Log out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="scroll-area px-5 -mt-2 pb-24">
//         <div className="flex items-center justify-between mt-4 mb-3">
//           <div className="flex items-center gap-2">
//             <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
//               <ClipboardList size={18} />
//             </span>
//             <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
//           </div>
//           <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
//             View All
//           </Link>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
//             Loading tasks…
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//             {categories.map((cat) => {
//               const isOpen = !!expanded[cat.id];
//               return (
//                 <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
//                   <button
//                     onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
//                     className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
//                   >
//                     <span className="font-semibold text-gray-800">{cat.name}</span>
//                     <span className="flex items-center gap-2">
//                       <span className="text-gray-500 text-sm">({cat.total})</span>
//                       {isOpen ? (
//                         <ChevronUp size={18} className="text-gray-400" />
//                       ) : (
//                         <ChevronDown size={18} className="text-gray-400" />
//                       )}
//                     </span>
//                   </button>

//                   {isOpen &&
//                     cat.types.map((t) => (
//                       <div
//                         key={t.id}
//                         className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
//                       >
//                         <button
//                           onClick={() => handleItemClick(t)}
//                           className="text-left flex-1 text-gray-600 text-sm"
//                         >
//                           {t.name}
//                         </button>
//                         <div className="flex items-center gap-3">
//                           {t.hasHistory && (
//                             <History
//                               size={16}
//                               className="text-gray-400 cursor-pointer"
//                               onClick={() => navigate(`/survey/${t.slug}`)}
//                             />
//                           )}
//                           <span className="text-gray-500 text-sm w-6 text-right">
//                             ({t.completedCount})
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               );
//             })}
//             <Link
//               to="/tasks"
//               className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
//             >
//               View more Tasks
//             </Link>
//           </div>
//         )}

//         {syncedAt && (
//           <p className="text-center text-xs text-gray-400 mt-4">
//             Last synced {syncedAt.toLocaleTimeString()}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={handleSync}
//         disabled={syncing}
//         className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60 z-10"
//       >
//         <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
//         Sync
//       </button>

//       {/* Confirmation Bottom Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end">
//           <div className="bg-white rounded-t-3xl pt-8 pb-0 px-6 text-center animate-in slide-in-from-bottom duration-200">
//             <p className="text-gray-800 font-medium text-base mb-8 px-4">
//               Do you want to perform '{selectedTask?.name}' visit ?
//             </p>
//             <div className="flex border-t border-gray-200 -mx-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleConfirmVisit}
//                 className="flex-1 py-4 text-white font-bold bg-[#00a86b] hover:bg-[#008f5b] active:bg-[#00784c] transition-colors"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }



































// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   History,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [syncedAt, setSyncedAt] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Confirmation Modal State
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const load = useCallback(async () => {
//     const data = await api.surveyTypes();
//     setCategories(data.categories);
//     setExpanded((prev) => {
//       if (Object.keys(prev).length) return prev;
//       const initial = {};
//       data.categories.forEach((c, i) => (initial[c.id] = i === 0));
//       return initial;
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     load().finally(() => setLoading(false));
//   }, [load]);

//   async function handleSync() {
//     setSyncing(true);
//     try {
//       await load();
//       setSyncedAt(new Date());
//     } finally {
//       setSyncing(false);
//     }
//   }

//   // Task click par modal open karne ka handler
//   const handleItemClick = (task) => {
//     setSelectedTask(task);
//     setShowModal(true);
//   };

//   // Modal me 'Yes' click karne par SiteList bypass karke direct SurveyForm (6.png) open karne ka handler
//   const handleConfirmVisit = () => {
//     if (selectedTask) {
//       setShowModal(false);

//       // Extract siteId dynamically if available, otherwise pass fallback ID '1' to prevent infinite loading
//       const siteId = selectedTask.defaultSiteId || selectedTask.sites?.[0]?.id || "1";

//       // Direct navigate to SurveyForm route expected by App.jsx
//       navigate(`/survey/${selectedTask.slug}/site/${siteId}`);
//     }
//   };

//   return (
//     <div className="app-shell relative">
//       <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-brand-100 text-sm">Welcome,</p>
//             <p className="text-xl font-bold">{user?.name}</p>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-1.5 rounded-lg active:bg-white/10"
//               aria-label="Menu"
//             >
//               <Menu size={22} />
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
//                 >
//                   <LogOut size={16} /> Log out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="scroll-area px-5 -mt-2 pb-24">
//         <div className="flex items-center justify-between mt-4 mb-3">
//           <div className="flex items-center gap-2">
//             <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
//               <ClipboardList size={18} />
//             </span>
//             <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
//           </div>
//           <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
//             View All
//           </Link>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
//             Loading tasks…
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//             {categories.map((cat) => {
//               const isOpen = !!expanded[cat.id];
//               return (
//                 <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
//                   <button
//                     onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
//                     className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
//                   >
//                     <span className="font-semibold text-gray-800">{cat.name}</span>
//                     <span className="flex items-center gap-2">
//                       <span className="text-gray-500 text-sm">({cat.total})</span>
//                       {isOpen ? (
//                         <ChevronUp size={18} className="text-gray-400" />
//                       ) : (
//                         <ChevronDown size={18} className="text-gray-400" />
//                       )}
//                     </span>
//                   </button>

//                   {isOpen &&
//                     cat.types.map((t) => (
//                       <div
//                         key={t.id}
//                         className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
//                       >
//                         <button
//                           onClick={() => handleItemClick(t)}
//                           className="text-left flex-1 text-gray-600 text-sm"
//                         >
//                           {t.name}
//                         </button>
//                         <div className="flex items-center gap-3">
//                           {t.hasHistory && (
//                             <History
//                               size={16}
//                               className="text-gray-400 cursor-pointer"
//                               onClick={() => {
//                                 const siteId = t.defaultSiteId || t.sites?.[0]?.id || "1";
//                                 navigate(`/survey/${t.slug}/site/${siteId}/history`);
//                               }}
//                             />
//                           )}
//                           <span className="text-gray-500 text-sm w-6 text-right">
//                             ({t.completedCount})
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               );
//             })}
//             <Link
//               to="/tasks"
//               className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
//             >
//               View more Tasks
//             </Link>
//           </div>
//         )}

//         {syncedAt && (
//           <p className="text-center text-xs text-gray-400 mt-4">
//             Last synced {syncedAt.toLocaleTimeString()}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={handleSync}
//         disabled={syncing}
//         className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60 z-10"
//       >
//         <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
//         Sync
//       </button>

//       {/* Confirmation Bottom Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end">
//           <div className="bg-white rounded-t-3xl pt-8 pb-0 px-6 text-center animate-in slide-in-from-bottom duration-200">
//             <p className="text-gray-800 font-medium text-base mb-8 px-4">
//               Do you want to perform '{selectedTask?.name}' visit ?
//             </p>
//             <div className="flex border-t border-gray-200 -mx-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleConfirmVisit}
//                 className="flex-1 py-4 text-white font-bold bg-[#00a86b] hover:bg-[#008f5b] active:bg-[#00784c] transition-colors"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }

















// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   History,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [syncedAt, setSyncedAt] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [pendingCounts, setPendingCounts] = useState({});

//   // Confirmation Modal State
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showModal, setShowModal] = useState(false);

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

//   const load = useCallback(async () => {
//     const data = await api.surveyTypes();
//     setCategories(data.categories || []);
//     setExpanded((prev) => {
//       if (Object.keys(prev).length) return prev;
//       const initial = {};
//       (data.categories || []).forEach((c, i) => (initial[c.id] = i === 0));
//       return initial;
//     });
//     loadPendingCounts();
//   }, [loadPendingCounts]);

//   useEffect(() => {
//     setLoading(true);
//     load().finally(() => setLoading(false));
//   }, [load]);

//   async function handleSync() {
//     setSyncing(true);
//     try {
//       await load();
//       setSyncedAt(new Date());
//     } finally {
//       setSyncing(false);
//     }
//   }

//   // Task click handler for modal
//   const handleItemClick = (task) => {
//     setSelectedTask(task);
//     setShowModal(true);
//   };

//   // Modal confirm handler
//   const handleConfirmVisit = () => {
//     if (selectedTask) {
//       setShowModal(false);
//       const siteId = selectedTask.defaultSiteId || selectedTask.sites?.[0]?.id || "1";
//       navigate(`/survey/${selectedTask.slug}/site/${siteId}`);
//     }
//   };

//   return (
//     <div className="app-shell relative">
//       <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-brand-100 text-sm">Welcome,</p>
//             <p className="text-xl font-bold">{user?.name}</p>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-1.5 rounded-lg active:bg-white/10"
//               aria-label="Menu"
//             >
//               <Menu size={22} />
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
//                 >
//                   <LogOut size={16} /> Log out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="scroll-area px-5 -mt-2 pb-24">
//         <div className="flex items-center justify-between mt-4 mb-3">
//           <div className="flex items-center gap-2">
//             <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
//               <ClipboardList size={18} />
//             </span>
//             <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
//           </div>
//           <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
//             View All
//           </Link>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
//             Loading tasks…
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//             {categories.map((cat) => {
//               const isOpen = !!expanded[cat.id];
//               return (
//                 <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
//                   <button
//                     onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
//                     className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
//                   >
//                     <span className="font-semibold text-gray-800">{cat.name}</span>
//                     <span className="flex items-center gap-2">
//                       <span className="text-gray-500 text-sm">({cat.total})</span>
//                       {isOpen ? (
//                         <ChevronUp size={18} className="text-gray-400" />
//                       ) : (
//                         <ChevronDown size={18} className="text-gray-400" />
//                       )}
//                     </span>
//                   </button>

//                   {isOpen &&
//                     cat.types.map((t) => {
//                       const dynamicPending = pendingCounts[t.slug] || 0;
//                       return (
//                         <div
//                           key={t.id}
//                           className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
//                         >
//                           <button
//                             onClick={() => handleItemClick(t)}
//                             className="text-left flex-1 text-gray-600 text-sm"
//                           >
//                             {t.name}
//                           </button>
//                           <div className="flex items-center gap-3">
//                             {t.hasHistory && (
//                               <History
//                                 size={16}
//                                 className="text-gray-400 cursor-pointer"
//                                 onClick={() => {
//                                   const siteId = t.defaultSiteId || t.sites?.[0]?.id || "1";
//                                   navigate(`/survey/${t.slug}/site/${siteId}/history`);
//                                 }}
//                               />
//                             )}
//                             <span className="text-gray-500 text-sm min-w-6 text-right">
//                               ({dynamicPending})
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               );
//             })}
//             <Link
//               to="/tasks"
//               className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
//             >
//               View more Tasks
//             </Link>
//           </div>
//         )}

//         {syncedAt && (
//           <p className="text-center text-xs text-gray-400 mt-4">
//             Last synced {syncedAt.toLocaleTimeString()}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={handleSync}
//         disabled={syncing}
//         className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60 z-10"
//       >
//         <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
//         Sync
//       </button>

//       {/* Confirmation Bottom Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end">
//           <div className="bg-white rounded-t-3xl pt-8 pb-0 px-6 text-center animate-in slide-in-from-bottom duration-200">
//             <p className="text-gray-800 font-medium text-base mb-8 px-4">
//               Do you want to perform '{selectedTask?.name}' visit ?
//             </p>
//             <div className="flex border-t border-gray-200 -mx-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleConfirmVisit}
//                 className="flex-1 py-4 text-white font-bold bg-[#00a86b] hover:bg-[#008f5b] active:bg-[#00784c] transition-colors"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }











// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   History,
//   ClipboardList,
//   LogOut,
// } from "lucide-react";
// import { api } from "../lib/api.js";
// import { useAuth } from "../lib/auth.jsx";
// import BottomNav from "../components/BottomNav.jsx";

// export default function Home() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [syncedAt, setSyncedAt] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [pendingCounts, setPendingCounts] = useState({});

//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showModal, setShowModal] = useState(false);

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

//   const load = useCallback(async () => {
//     const data = await api.surveyTypes();
//     setCategories(data.categories || []);
//     setExpanded((prev) => {
//       if (Object.keys(prev).length) return prev;
//       const initial = {};
//       (data.categories || []).forEach((c, i) => (initial[c.id] = i === 0));
//       return initial;
//     });
//     loadPendingCounts();
//   }, [loadPendingCounts]);

//   useEffect(() => {
//     setLoading(true);
//     load().finally(() => setLoading(false));
//   }, [load]);

//   async function handleSync() {
//     setSyncing(true);
//     try {
//       await load();
//       setSyncedAt(new Date());
//     } finally {
//       setSyncing(false);
//     }
//   }

//   const handleItemClick = (task) => {
//     setSelectedTask(task);
//     setShowModal(true);
//   };

//   const handleConfirmVisit = () => {
//     if (selectedTask) {
//       setShowModal(false);
//       const siteId = selectedTask.defaultSiteId || selectedTask.sites?.[0]?.id || "1";
//       navigate(`/survey/${selectedTask.slug}/site/${siteId}`);
//     }
//   };

//   return (
//     <div className="app-shell relative">
//       <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-brand-100 text-sm">Welcome,</p>
//             <p className="text-xl font-bold">{user?.name}</p>
//           </div>
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="p-1.5 rounded-lg active:bg-white/10"
//               aria-label="Menu"
//             >
//               <Menu size={22} />
//             </button>
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
//                 >
//                   <LogOut size={16} /> Log out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="scroll-area px-5 -mt-2 pb-24">
//         <div className="flex items-center justify-between mt-4 mb-3">
//           <div className="flex items-center gap-2">
//             <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
//               <ClipboardList size={18} />
//             </span>
//             <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
//           </div>
//           <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
//             View All
//           </Link>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
//             Loading tasks…
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
//             {categories.map((cat) => {
//               const isOpen = !!expanded[cat.id];
//               return (
//                 <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
//                   <button
//                     onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
//                     className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
//                   >
//                     <span className="font-semibold text-gray-800">{cat.name}</span>
//                     <span className="flex items-center gap-2">
//                       <span className="text-gray-500 text-sm">({cat.total})</span>
//                       {isOpen ? (
//                         <ChevronUp size={18} className="text-gray-400" />
//                       ) : (
//                         <ChevronDown size={18} className="text-gray-400" />
//                       )}
//                     </span>
//                   </button>

//                   {isOpen &&
//                     cat.types.map((t) => {
//                       const dynamicPending = pendingCounts[t.slug] || 0;
//                       return (
//                         <div
//                           key={t.id}
//                           className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
//                         >
//                           <button
//                             onClick={() => handleItemClick(t)}
//                             className="text-left flex-1 text-gray-600 text-sm"
//                           >
//                             {t.name}
//                           </button>
//                           <div className="flex items-center gap-3">
//                             {t.hasHistory && (
//                               <History
//                                 size={16}
//                                 className="text-gray-400 cursor-pointer"
//                                 onClick={() => {
//                                   const siteId = t.defaultSiteId || t.sites?.[0]?.id || "1";
//                                   navigate(`/survey/${t.slug}/site/${siteId}/history`);
//                                 }}
//                               />
//                             )}
//                             <span className="text-gray-500 text-sm min-w-6 text-right">
//                               ({dynamicPending})
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               );
//             })}
//             <Link
//               to="/tasks"
//               className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
//             >
//               View more Tasks
//             </Link>
//           </div>
//         )}

//         {syncedAt && (
//           <p className="text-center text-xs text-gray-400 mt-4">
//             Last synced {syncedAt.toLocaleTimeString()}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={handleSync}
//         disabled={syncing}
//         className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60 z-10"
//       >
//         <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
//         Sync
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end">
//           <div className="bg-white rounded-t-3xl pt-8 pb-0 px-6 text-center animate-in slide-in-from-bottom duration-200">
//             <p className="text-gray-800 font-medium text-base mb-8 px-4">
//               Do you want to perform '{selectedTask?.name}' visit ?
//             </p>
//             <div className="flex border-t border-gray-200 -mx-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handleConfirmVisit}
//                 className="flex-1 py-4 text-white font-bold bg-[#00a86b] hover:bg-[#008f5b] active:bg-[#00784c] transition-colors"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }




import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/auth.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingCounts, setPendingCounts] = useState({});

  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Read User-Specific Pending Surveys
  const loadPendingCounts = useCallback(() => {
    const activeUserId = user?.id || user?._id || user?.userId || "guest_user";
    const storageKey = `pending_surveys_${activeUserId}`;
    const userSurveys = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const counts = {};
    userSurveys.forEach((item) => {
      const slug = item.surveyTypeSlug;
      counts[slug] = (counts[slug] || 0) + 1;
    });
    setPendingCounts(counts);
  }, [user]);

  const load = useCallback(async () => {
    const data = await api.surveyTypes();
    setCategories(data.categories || []);
    setExpanded((prev) => {
      if (Object.keys(prev).length) return prev;
      const initial = {};
      (data.categories || []).forEach((c, i) => (initial[c.id] = i === 0));
      return initial;
    });
    loadPendingCounts();
  }, [loadPendingCounts]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  // Working Sync Handler
  async function handleSync() {
    setSyncing(true);
    try {
      await load(); // Refetches API & updates LocalStorage pending counts
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500); // Auto hide toast after 2.5s
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setSyncing(false);
    }
  }

  const handleItemClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleConfirmVisit = () => {
    if (selectedTask) {
      setShowModal(false);
      const siteId = selectedTask.defaultSiteId || selectedTask.sites?.[0]?.id || "1";
      navigate(`/survey/${selectedTask.slug}/site/${siteId}`);
    }
  };

  return (
    <div className="app-shell relative">
      <div className="bg-brand-500 text-white px-5 pt-5 pb-7 rounded-b-3xl relative shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-brand-100 text-sm">Welcome,</p>
            <p className="text-xl font-bold">{user?.name}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg active:bg-white/10"
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden text-brand-600 z-20">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium active:bg-gray-50"
                >
                  <LogOut size={16} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="scroll-area px-5 -mt-2 pb-24">
        <div className="flex items-center justify-between mt-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
              <ClipboardList size={18} />
            </span>
            <h2 className="text-brand-600 font-bold text-lg">Surveys</h2>
          </div>
          <Link to="/tasks" className="text-brand-500 text-sm font-semibold">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-6 text-center text-sm text-gray-400">
            Loading tasks…
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden">
            {categories.map((cat) => {
              const isOpen = !!expanded[cat.id];
              return (
                <div key={cat.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
                    className="w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-800">{cat.name}</span>
                    <span className="flex items-center gap-2">
                      {isOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                      )}
                    </span>
                  </button>

                  {isOpen &&
                    cat.types.map((t) => {
                      const dynamicPending = pendingCounts[t.slug] || 0;
                      return (
                        <div
                          key={t.id}
                          className="flex items-center justify-between pl-7 pr-4 py-3 border-t border-gray-50 active:bg-gray-50"
                        >
                          <button
                            onClick={() => handleItemClick(t)}
                            className="text-left flex-1 text-gray-600 text-sm"
                          >
                            {t.name}
                          </button>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-sm min-w-6 text-right">
                              ({dynamicPending})
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
            <Link
              to="/tasks"
              className="block text-center text-brand-500 font-bold text-sm py-3.5 underline underline-offset-2"
            >
              View more Tasks
            </Link>
          </div>
        )}
      </div>

      {/* Sync Success Notification Toast */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 animate-bounce">
          Data synced successfully!
        </div>
      )}

      {/* Interactive Sync Button */}
      <button
        onClick={handleSync}
        disabled={syncing}
        className="absolute bottom-24 right-5 flex items-center gap-2 border border-brand-500 text-brand-500 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow-card active:bg-brand-50 disabled:opacity-60 z-10"
      >
        <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
        {syncing ? "Syncing..." : "Sync"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl pt-8 pb-0 px-6 text-center animate-in slide-in-from-bottom duration-200">
            <p className="text-gray-800 font-medium text-base mb-8 px-4">
              Do you want to perform '{selectedTask?.name}' visit ?
            </p>
            <div className="flex border-t border-gray-200 -mx-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleConfirmVisit}
                className="flex-1 py-4 text-white font-bold bg-[#00a86b] hover:bg-[#008f5b] active:bg-[#00784c] transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}