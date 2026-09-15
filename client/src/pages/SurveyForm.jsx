// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { ChevronLeft } from "lucide-react";
// // import { api } from "../lib/api.js";
// // import { progressFor, formatDuration } from "../lib/questions.js";
// // import QuestionField from "../components/QuestionField.jsx";
// // import CameraCapture from "../components/CameraCapture.jsx";

// // export default function SurveyForm() {
// //   const { slug, siteId } = useParams();
// //   const navigate = useNavigate();

// //   const [surveyType, setSurveyType] = useState(null);
// //   const [site, setSite] = useState(null);
// //   const [answers, setAnswers] = useState({});
// //   const [cameraFor, setCameraFor] = useState(null);
// //   const [elapsed, setElapsed] = useState(0);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState("");
// //   const startedAt = useRef(Date.now());

// //   useEffect(() => {
// //     api.surveyType(slug).then((data) => {
// //       setSurveyType(data);
// //       setSite(data.sites.find((s) => s.id === siteId) || null);
// //     });
// //   }, [slug, siteId]);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   const { attempted, total } = useMemo(
// //     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
// //     [surveyType, answers]
// //   );

// //   function handleChange(id, value) {
// //     setAnswers((prev) => ({ ...prev, [id]: value }));
// //   }

// //   async function handleCapture(dataUrl) {
// //     const questionId = cameraFor;
// //     setCameraFor(null);
// //     // Show the photo immediately, then swap in the uploaded URL.
// //     handleChange(questionId, dataUrl);
// //     try {
// //       const { url } = await api.upload(dataUrl);
// //       handleChange(questionId, url);
// //     } catch {
// //       setError("Photo upload failed — check your connection and retake the photo.");
// //     }
// //   }

// //   async function handleSubmit() {
// //     if (attempted < total || submitting) return;
// //     setSubmitting(true);
// //     setError("");
// //     try {
// //       await api.createVisit({
// //         surveyTypeSlug: slug,
// //         siteId,
// //         answers,
// //         durationSeconds: elapsed,
// //       });
// //       navigate(`/survey/${slug}`, { replace: true });
// //     } catch (err) {
// //       setError(err.message || "Could not submit the survey");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }

// //   if (!surveyType || !site) {
// //     return (
// //       <div className="app-shell items-center justify-center">
// //         <p className="text-sm text-gray-400">Loading survey…</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="app-shell">
// //       <div className="bg-brand-500 text-white px-4 pt-4 pb-10 rounded-b-3xl shrink-0 relative">
// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="p-1 -ml-1 rounded-full active:bg-white/10"
// //             aria-label="Go back"
// //           >
// //             <ChevronLeft size={24} />
// //           </button>
// //           <div className="flex-1 min-w-0">
// //             <h1 className="text-lg font-bold truncate">{surveyType.name}</h1>
// //             <p className="text-brand-100 text-xs truncate">{site.name}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="px-5 -mt-6 shrink-0">
// //         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-sm">
// //           <span className="text-gray-500">
// //             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
// //           </span>
// //           <span className="text-gray-500">
// //             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
// //           </span>
// //         </div>
// //       </div>

// //       <div className="scroll-area px-5 pt-4 pb-4">
// //         <div className="divide-y divide-gray-50">
// //           {surveyType.questions.map((q) => (
// //             <QuestionField
// //               key={q.id}
// //               question={q}
// //               answers={answers}
// //               onChange={handleChange}
// //               onOpenCamera={setCameraFor}
// //             />
// //           ))}
// //         </div>

// //         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
// //       </div>

// //       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
// //         <button
// //           onClick={handleSubmit}
// //           disabled={attempted < total || submitting}
// //           className="w-full bg-accent text-white font-semibold rounded-xl py-3 disabled:opacity-40 active:bg-accent-dark"
// //         >
// //           {submitting ? "Submitting…" : "Done"}
// //         </button>
// //       </div>

// //       {cameraFor && (
// //         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
// //       )}
// //     </div>
// //   );
// // }







// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, Share2, AlertCircle, ClipboardList } from "lucide-react";
// import { api } from "../lib/api.js";
// import { progressFor, formatDuration } from "../lib/questions.js";
// import QuestionField from "../components/QuestionField.jsx";
// import CameraCapture from "../components/CameraCapture.jsx";

// export default function SurveyForm() {
//   const { slug, siteId } = useParams();
//   const navigate = useNavigate();

//   const [surveyType, setSurveyType] = useState(null);
//   const [site, setSite] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [cameraFor, setCameraFor] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const startedAt = useRef(Date.now());

//   useEffect(() => {
//     api.surveyType(slug).then((data) => {
//       setSurveyType(data);
//       setSite(data.sites.find((s) => s.id === siteId) || null);
//     });
//   }, [slug, siteId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const { attempted, total } = useMemo(
//     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
//     [surveyType, answers]
//   );

//   function handleChange(id, value) {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   }

//   async function handleCapture(dataUrl) {
//     const questionId = cameraFor;
//     setCameraFor(null);
//     handleChange(questionId, dataUrl);
//     try {
//       const { url } = await api.upload(dataUrl);
//       handleChange(questionId, url);
//     } catch {
//       setError("Photo upload failed — check your connection and retake the photo.");
//     }
//   }

//   async function handleSubmit() {
//     if (attempted < total || submitting) return;
//     setSubmitting(true);
//     setError("");
//     try {
//       await api.createVisit({
//         surveyTypeSlug: slug,
//         siteId,
//         answers,
//         durationSeconds: elapsed,
//       });
//       navigate(`/survey/${slug}`, { replace: true });
//     } catch (err) {
//       setError(err.message || "Could not submit the survey");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (!surveyType || !site) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-sm text-gray-400">Loading survey…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="app-shell">
//       {/* Header Updated to match Image 4 */}
//       <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
//         <div className="w-full flex items-center justify-between mb-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-1 -ml-1 rounded-full active:bg-white/10"
//             aria-label="Go back"
//           >
//             <ChevronLeft size={26} />
//           </button>
          
//           <div className="flex items-center gap-3">
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
//               <Share2 size={20} />
//             </button>
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
//               <AlertCircle size={22} />
//             </button>
//           </div>
//         </div>

//         {/* Center Icon & Title */}
//         <div className="my-2 flex justify-center">
//           <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
//         </div>
//         <h1 className="text-xl font-bold max-w-[220px] leading-snug">
//           {surveyType.name}
//         </h1>
//       </div>

//       <div className="px-5 -mt-6 shrink-0 z-10">
//         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
//           <span className="text-gray-400">
//             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
//           </span>
//           <span className="text-gray-400">
//             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
//           </span>
//         </div>
//       </div>

//       <div className="scroll-area px-5 pt-4 pb-4">
//         <div className="divide-y divide-gray-50">
//           {surveyType.questions.map((q) => (
//             <QuestionField
//               key={q.id}
//               question={q}
//               answers={answers}
//               onChange={handleChange}
//               onOpenCamera={setCameraFor}
//             />
//           ))}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//       </div>

//       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
//         <button
//           onClick={handleSubmit}
//           disabled={attempted < total || submitting}
//           className="w-full bg-accent text-white font-semibold rounded-xl py-3 disabled:opacity-40 active:bg-accent-dark"
//         >
//           {submitting ? "Submitting…" : "Done"}
//         </button>
//       </div>

//       {cameraFor && (
//         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
//       )}
//     </div>
//   );
// }

































// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, Share2, AlertCircle, ClipboardList } from "lucide-react";
// import { api } from "../lib/api.js";
// import { progressFor, formatDuration } from "../lib/questions.js";
// import QuestionField from "../components/QuestionField.jsx";
// import CameraCapture from "../components/CameraCapture.jsx";

// export default function SurveyForm() {
//   const { slug, siteId } = useParams();
//   const navigate = useNavigate();

//   const [surveyType, setSurveyType] = useState(null);
//   const [site, setSite] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [cameraFor, setCameraFor] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const startedAt = useRef(Date.now());

//   useEffect(() => {
//     let isMounted = true;
//     api.surveyType(slug).then((data) => {
//       if (!isMounted) return;
//       setSurveyType(data);
      
//       // FIX: Agar siteId URL me match na mile, toh list ka pehla site fallback use karein ya dummy default site object create karein.
//       const matchedSite = data?.sites?.find((s) => s.id === siteId) || data?.sites?.[0] || { id: siteId || "1", name: "Default Site" };
//       setSite(matchedSite);
//     }).catch((err) => {
//       console.error("Failed to load survey type:", err);
//       setError("Failed to load survey data.");
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [slug, siteId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const { attempted, total } = useMemo(
//     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
//     [surveyType, answers]
//   );

//   function handleChange(id, value) {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   }

//   async function handleCapture(dataUrl) {
//     const questionId = cameraFor;
//     setCameraFor(null);
//     handleChange(questionId, dataUrl);
//     try {
//       const { url } = await api.upload(dataUrl);
//       handleChange(questionId, url);
//     } catch {
//       setError("Photo upload failed — check your connection and retake the photo.");
//     }
//   }

//   async function handleSubmit() {
//     if (attempted < total || submitting) return;
//     setSubmitting(true);
//     setError("");
//     try {
//       await api.createVisit({
//         surveyTypeSlug: slug,
//         siteId: site?.id || siteId || "1",
//         answers,
//         durationSeconds: elapsed,
//       });
//       navigate(`/survey/${slug}`, { replace: true });
//     } catch (err) {
//       setError(err.message || "Could not submit the survey");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   // FIX: Handling condition update: sirf jab tak surveyType null ho tab loading dikhayein
//   if (!surveyType) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-sm text-gray-400">Loading survey…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="app-shell">
//       {/* Header Updated to match Image 4 */}
//       <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
//         <div className="w-full flex items-center justify-between mb-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-1 -ml-1 rounded-full active:bg-white/10"
//             aria-label="Go back"
//           >
//             <ChevronLeft size={26} />
//           </button>
          
//           <div className="flex items-center gap-3">
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
//               <Share2 size={20} />
//             </button>
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
//               <AlertCircle size={22} />
//             </button>
//           </div>
//         </div>

//         {/* Center Icon & Title */}
//         <div className="my-2 flex justify-center">
//           <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
//         </div>
//         <h1 className="text-xl font-bold max-w-[220px] leading-snug">
//           {surveyType.name}
//         </h1>
//       </div>

//       <div className="px-5 -mt-6 shrink-0 z-10">
//         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
//           <span className="text-gray-400">
//             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
//           </span>
//           <span className="text-gray-400">
//             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
//           </span>
//         </div>
//       </div>

//       <div className="scroll-area px-5 pt-4 pb-4">
//         <div className="divide-y divide-gray-50">
//           {surveyType.questions.map((q) => (
//             <QuestionField
//               key={q.id}
//               question={q}
//               answers={answers}
//               onChange={handleChange}
//               onOpenCamera={setCameraFor}
//             />
//           ))}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//       </div>

//       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
//         <button
//           onClick={handleSubmit}
//           disabled={attempted < total || submitting}
//           className="w-full bg-accent text-white font-semibold rounded-xl py-3 disabled:opacity-40 active:bg-accent-dark"
//         >
//           {submitting ? "Submitting…" : "Done"}
//         </button>
//       </div>

//       {cameraFor && (
//         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
//       )}
//     </div>
//   );
// }





















// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, Share2, AlertCircle, ClipboardList } from "lucide-react";
// import { api } from "../lib/api.js";
// import { progressFor, formatDuration } from "../lib/questions.js";
// import QuestionField from "../components/QuestionField.jsx";
// import CameraCapture from "../components/CameraCapture.jsx";

// export default function SurveyForm() {
//   const { slug, siteId } = useParams();
//   const navigate = useNavigate();

//   const [surveyType, setSurveyType] = useState(null);
//   const [site, setSite] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [cameraFor, setCameraFor] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const startedAt = useRef(Date.now());

//   useEffect(() => {
//     let isMounted = true;
//     api.surveyType(slug)
//       .then((data) => {
//         if (!isMounted) return;
//         setSurveyType(data);
        
//         const matchedSite =
//           data?.sites?.find((s) => s.id === siteId) ||
//           data?.sites?.[0] || { id: siteId || "1", name: "Default Site" };
//         setSite(matchedSite);
//       })
//       .catch((err) => {
//         console.error("Failed to load survey type:", err);
//         setError("Failed to load survey data.");
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [slug, siteId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const { attempted, total } = useMemo(
//     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
//     [surveyType, answers]
//   );

//   function handleChange(id, value) {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   }

//   async function handleCapture(dataUrl) {
//     const questionId = cameraFor;
//     setCameraFor(null);
//     handleChange(questionId, dataUrl);
//     try {
//       const { url } = await api.upload(dataUrl);
//       handleChange(questionId, url);
//     } catch {
//       setError("Photo upload failed — check your connection and retake the photo.");
//     }
//   }

//   async function handleSubmit() {
//     if (submitting) return;
//     setSubmitting(true);
//     setError("");

//     try {
//       await api.createVisit({
//         surveyTypeSlug: slug,
//         siteId: site?.id || siteId || "1",
//         answers,
//         durationSeconds: elapsed,
//       });

//       // Done click hote hi direct Home Dashboard (Image 7) par redirect
//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Submit error:", err);
//       // Fallback: API fail hone par bhi UI screen redirect karegi
//       navigate("/", { replace: true });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (!surveyType) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-sm text-gray-400">Loading survey…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="app-shell">
//       {/* Header Matching Image 4 */}
//       <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
//         <div className="w-full flex items-center justify-between mb-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-1 -ml-1 rounded-full active:bg-white/10"
//             aria-label="Go back"
//           >
//             <ChevronLeft size={26} />
//           </button>
          
//           <div className="flex items-center gap-3">
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
//               <Share2 size={20} />
//             </button>
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
//               <AlertCircle size={22} />
//             </button>
//           </div>
//         </div>

//         <div className="my-2 flex justify-center">
//           <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
//         </div>
//         <h1 className="text-xl font-bold max-w-[220px] leading-snug">
//           {surveyType.name}
//         </h1>
//       </div>

//       <div className="px-5 -mt-6 shrink-0 z-10">
//         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
//           <span className="text-gray-400">
//             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
//           </span>
//           <span className="text-gray-400">
//             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
//           </span>
//         </div>
//       </div>

//       <div className="scroll-area px-5 pt-4 pb-4">
//         <div className="divide-y divide-gray-50">
//           {surveyType.questions.map((q) => (
//             <QuestionField
//               key={q.id}
//               question={q}
//               answers={answers}
//               onChange={handleChange}
//               onOpenCamera={setCameraFor}
//             />
//           ))}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//       </div>

//       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
//         <button
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="w-full bg-accent text-white font-semibold rounded-xl py-3 active:bg-accent-dark disabled:opacity-50"
//         >
//           {submitting ? "Submitting…" : "Done"}
//         </button>
//       </div>

//       {cameraFor && (
//         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, Share2, AlertCircle, ClipboardList, AlertCircle as WarningIcon } from "lucide-react";
// import { api } from "../lib/api.js";
// import { progressFor, formatDuration } from "../lib/questions.js";
// import QuestionField from "../components/QuestionField.jsx";
// import CameraCapture from "../components/CameraCapture.jsx";

// export default function SurveyForm() {
//   const { slug, siteId } = useParams();
//   const navigate = useNavigate();

//   const [surveyType, setSurveyType] = useState(null);
//   const [site, setSite] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [cameraFor, setCameraFor] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
  
//   // State for showing 8.png Toast
//   const [showIncompleteModal, setShowIncompleteModal] = useState(false);
//   const startedAt = useRef(Date.now());

//   useEffect(() => {
//     let isMounted = true;
//     api.surveyType(slug)
//       .then((data) => {
//         if (!isMounted) return;
//         setSurveyType(data);
        
//         const matchedSite =
//           data?.sites?.find((s) => s.id === siteId) ||
//           data?.sites?.[0] || { id: siteId || "1", name: "Default Site" };
//         setSite(matchedSite);
//       })
//       .catch((err) => {
//         console.error("Failed to load survey type:", err);
//         setError("Failed to load survey data.");
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [slug, siteId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const { attempted, total } = useMemo(
//     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
//     [surveyType, answers]
//   );

//   function handleChange(id, value) {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   }

//   async function handleCapture(dataUrl) {
//     const questionId = cameraFor;
//     setCameraFor(null);
//     handleChange(questionId, dataUrl);
//     try {
//       const { url } = await api.upload(dataUrl);
//       handleChange(questionId, url);
//     } catch {
//       setError("Photo upload failed — check your connection and retake the photo.");
//     }
//   }

//   async function handleSubmit() {
//     // 8.png Validation: Jab tak sab questions complete na hon, Toast Toast notification trigger karein
//     if (attempted < total) {
//       setShowIncompleteModal(true);
//       setTimeout(() => setShowIncompleteModal(false), 3000);
//       return;
//     }

//     if (submitting) return;
//     setSubmitting(true);
//     setError("");

//     try {
//       await api.createVisit({
//         surveyTypeSlug: slug,
//         siteId: site?.id || siteId || "1",
//         answers,
//         durationSeconds: elapsed,
//       });

//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Submit error:", err);
//       navigate("/", { replace: true });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (!surveyType) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-sm text-gray-400">Loading survey…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="app-shell relative">
//       {/* 8.png Popup Notification */}
//       {showIncompleteModal && (
//         <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-center gap-3 transition-all duration-300">
//           <div className="p-2 bg-pink-50 rounded-full text-brand-500 shrink-0">
//             <WarningIcon size={24} />
//           </div>
//           <div>
//             <h3 className="text-brand-500 font-bold text-sm">Incomplete Task</h3>
//             <p className="text-gray-600 text-xs">Please attempt all mandatory questions!</p>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
//         <div className="w-full flex items-center justify-between mb-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-1 -ml-1 rounded-full active:bg-white/10"
//             aria-label="Go back"
//           >
//             <ChevronLeft size={26} />
//           </button>
          
//           <div className="flex items-center gap-3">
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
//               <Share2 size={20} />
//             </button>
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
//               <AlertCircle size={22} />
//             </button>
//           </div>
//         </div>

//         <div className="my-2 flex justify-center">
//           <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
//         </div>
//         <h1 className="text-xl font-bold max-w-[220px] leading-snug">
//           {surveyType.name}
//         </h1>
//       </div>

//       <div className="px-5 -mt-6 shrink-0 z-10">
//         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
//           <span className="text-gray-400">
//             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
//           </span>
//           <span className="text-gray-400">
//             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
//           </span>
//         </div>
//       </div>

//       <div className="scroll-area px-5 pt-4 pb-4">
//         <div className="divide-y divide-gray-50">
//           {surveyType.questions.map((q) => (
//             <QuestionField
//               key={q.id}
//               question={q}
//               answers={answers}
//               onChange={handleChange}
//               onOpenCamera={setCameraFor}
//             />
//           ))}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//       </div>

//       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
//         <button
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="w-full bg-accent text-white font-semibold rounded-xl py-3 active:bg-accent-dark disabled:opacity-50"
//         >
//           {submitting ? "Submitting…" : "Done"}
//         </button>
//       </div>

//       {cameraFor && (
//         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
//       )}
//     </div>
//   );
// }


























// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, Share2, AlertCircle, ClipboardList, AlertCircle as WarningIcon } from "lucide-react";
// import { api } from "../lib/api.js";
// import { progressFor, formatDuration } from "../lib/questions.js";
// import { useAuth } from "../lib/auth.jsx";
// import QuestionField from "../components/QuestionField.jsx";
// import CameraCapture from "../components/CameraCapture.jsx";

// export default function SurveyForm() {
//   const { slug, siteId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Logged-in user context

//   const [surveyType, setSurveyType] = useState(null);
//   const [site, setSite] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [cameraFor, setCameraFor] = useState(null);
//   const [elapsed, setElapsed] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
  
//   // State for showing Toast notification
//   const [showIncompleteModal, setShowIncompleteModal] = useState(false);
//   const startedAt = useRef(Date.now());

//   useEffect(() => {
//     let isMounted = true;
//     api.surveyType(slug)
//       .then((data) => {
//         if (!isMounted) return;
//         setSurveyType(data);
        
//         const matchedSite =
//           data?.sites?.find((s) => s.id === siteId) ||
//           data?.sites?.[0] || { id: siteId || "1", name: "Default Site" };
//         setSite(matchedSite);
//       })
//       .catch((err) => {
//         console.error("Failed to load survey type:", err);
//         setError("Failed to load survey data.");
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [slug, siteId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const { attempted, total } = useMemo(
//     () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
//     [surveyType, answers]
//   );

//   function handleChange(id, value) {
//     setAnswers((prev) => ({ ...prev, [id]: value }));
//   }

//   async function handleCapture(dataUrl) {
//     const questionId = cameraFor;
//     setCameraFor(null);
//     handleChange(questionId, dataUrl);
//     try {
//       const { url } = await api.upload(dataUrl);
//       handleChange(questionId, url);
//     } catch {
//       setError("Photo upload failed — check your connection and retake the photo.");
//     }
//   }

//   async function handleSubmit() {
//     // Validation: Check all mandatory questions
//     if (attempted < total) {
//       setShowIncompleteModal(true);
//       setTimeout(() => setShowIncompleteModal(false), 3000);
//       return;
//     }

//     if (submitting) return;
//     setSubmitting(true);
//     setError("");

//     try {
//       // 1. User-specific Local Storage Saving
//       if (user?.id) {
//         const storageKey = `pending_surveys_${user.id}`;
//         const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
        
//         existingData.push({
//           surveyTypeSlug: slug,
//           siteId: site?.id || siteId || "1",
//           answers,
//           durationSeconds: elapsed,
//           submittedAt: new Date().toISOString()
//         });

//         localStorage.setItem(storageKey, JSON.stringify(existingData));
//       }

//       // 2. API Submission
//       await api.createVisit({
//         surveyTypeSlug: slug,
//         siteId: site?.id || siteId || "1",
//         answers,
//         durationSeconds: elapsed,
//       });

//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Submit error:", err);
//       navigate("/", { replace: true });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (!surveyType) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-sm text-gray-400">Loading survey…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="app-shell relative">
//       {/* Toast Notification */}
//       {showIncompleteModal && (
//         <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-center gap-3 transition-all duration-300">
//           <div className="p-2 bg-pink-50 rounded-full text-brand-500 shrink-0">
//             <WarningIcon size={24} />
//           </div>
//           <div>
//             <h3 className="text-brand-500 font-bold text-sm">Incomplete Task</h3>
//             <p className="text-gray-600 text-xs">Please attempt all mandatory questions!</p>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
//         <div className="w-full flex items-center justify-between mb-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-1 -ml-1 rounded-full active:bg-white/10"
//             aria-label="Go back"
//           >
//             <ChevronLeft size={26} />
//           </button>
          
//           <div className="flex items-center gap-3">
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
//               <Share2 size={20} />
//             </button>
//             <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
//               <AlertCircle size={22} />
//             </button>
//           </div>
//         </div>

//         <div className="my-2 flex justify-center">
//           <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
//         </div>
//         <h1 className="text-xl font-bold max-w-[220px] leading-snug">
//           {surveyType.name}
//         </h1>
//       </div>

//       <div className="px-5 -mt-6 shrink-0 z-10">
//         <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
//           <span className="text-gray-400">
//             Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
//           </span>
//           <span className="text-gray-400">
//             Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
//           </span>
//         </div>
//       </div>

//       <div className="scroll-area px-5 pt-4 pb-4">
//         <div className="divide-y divide-gray-50">
//           {surveyType.questions.map((q) => (
//             <QuestionField
//               key={q.id}
//               question={q}
//               answers={answers}
//               onChange={handleChange}
//               onOpenCamera={setCameraFor}
//             />
//           ))}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//       </div>

//       <div className="p-4 border-t border-gray-100 bg-white shrink-0">
//         <button
//           onClick={handleSubmit}
//           disabled={submitting}
//           className="w-full bg-accent text-white font-semibold rounded-xl py-3 active:bg-accent-dark disabled:opacity-50"
//         >
//           {submitting ? "Submitting…" : "Done"}
//         </button>
//       </div>

//       {cameraFor && (
//         <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
//       )}
//     </div>
//   );
// }






















import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Share2, AlertCircle, ClipboardList, AlertCircle as WarningIcon } from "lucide-react";
import { api } from "../lib/api.js";
import { progressFor, formatDuration } from "../lib/questions.js";
import { useAuth } from "../lib/auth.jsx";
import QuestionField from "../components/QuestionField.jsx";
import CameraCapture from "../components/CameraCapture.jsx";

export default function SurveyForm() {
  const { slug, siteId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Logged-in user context

  const [surveyType, setSurveyType] = useState(null);
  const [site, setSite] = useState(null);
  const [answers, setAnswers] = useState({});
  const [cameraFor, setCameraFor] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // State for showing Toast notification
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let isMounted = true;
    api.surveyType(slug)
      .then((data) => {
        if (!isMounted) return;
        setSurveyType(data);
        
        const matchedSite =
          data?.sites?.find((s) => s.id === siteId) ||
          data?.sites?.[0] || { id: siteId || "1", name: "Default Site" };
        setSite(matchedSite);
      })
      .catch((err) => {
        console.error("Failed to load survey type:", err);
        setError("Failed to load survey data.");
      });

    return () => {
      isMounted = false;
    };
  }, [slug, siteId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { attempted, total } = useMemo(
    () => (surveyType ? progressFor(surveyType.questions, answers) : { attempted: 0, total: 0 }),
    [surveyType, answers]
  );

  function handleChange(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleCapture(dataUrl) {
    const questionId = cameraFor;
    setCameraFor(null);
    handleChange(questionId, dataUrl);
    try {
      const { url } = await api.upload(dataUrl);
      handleChange(questionId, url);
    } catch {
      setError("Photo upload failed — check your connection and retake the photo.");
    }
  }

  async function handleSubmit() {
    // 1. Validation check
    if (attempted < total) {
      setShowIncompleteModal(true);
      setTimeout(() => setShowIncompleteModal(false), 3000);
      return;
    }

    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      // 2. Dynamic User ID Fallback & Local Storage Saving
      const activeUserId = user?.id || user?._id || user?.userId || "guest_user";
      const storageKey = `pending_surveys_${activeUserId}`;
      
      const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      const newEntry = {
        surveyTypeSlug: slug,
        siteId: site?.id || siteId || "1",
        answers,
        durationSeconds: elapsed,
        submittedAt: new Date().toISOString()
      };

      existingData.push(newEntry);
      localStorage.setItem(storageKey, JSON.stringify(existingData));

      // 3. API Submission
      await api.createVisit({
        surveyTypeSlug: slug,
        siteId: site?.id || siteId || "1",
        answers,
        durationSeconds: elapsed,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Submit error:", err);
      // Agar API fail bhi hoti hai, data local storage me save rehne ke baad navigate karega
      navigate("/", { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  if (!surveyType) {
    return (
      <div className="app-shell items-center justify-center">
        <p className="text-sm text-gray-400">Loading survey…</p>
      </div>
    );
  }

  return (
    <div className="app-shell relative">
      {/* Toast Notification */}
      {showIncompleteModal && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-center gap-3 transition-all duration-300">
          <div className="p-2 bg-pink-50 rounded-full text-brand-500 shrink-0">
            <WarningIcon size={24} />
          </div>
          <div>
            <h3 className="text-brand-500 font-bold text-sm">Incomplete Task</h3>
            <p className="text-gray-600 text-xs">Please attempt all mandatory questions!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-brand-500 text-white px-5 pt-4 pb-12 rounded-b-[32px] shrink-0 relative flex flex-col items-center justify-center text-center">
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-full active:bg-white/10"
            aria-label="Go back"
          >
            <ChevronLeft size={26} />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-1 rounded-full active:bg-white/10" aria-label="Share">
              <Share2 size={20} />
            </button>
            <button className="p-1 rounded-full active:bg-white/10" aria-label="Info">
              <AlertCircle size={22} />
            </button>
          </div>
        </div>

        <div className="my-2 flex justify-center">
          <ClipboardList size={54} strokeWidth={1.5} className="text-white" />
        </div>
        <h1 className="text-xl font-bold max-w-[220px] leading-snug">
          {surveyType.name}
        </h1>
      </div>

      <div className="px-5 -mt-6 shrink-0 z-10">
        <div className="bg-white rounded-full shadow-card border border-gray-100 flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
          <span className="text-gray-400">
            Questions Attempted <span className="font-bold text-gray-800">{attempted}/{total}</span>
          </span>
          <span className="text-gray-400">
            Time Spent <span className="font-bold text-gray-800">{formatDuration(elapsed)}</span>
          </span>
        </div>
      </div>

      <div className="scroll-area px-5 pt-4 pb-4">
        <div className="divide-y divide-gray-50">
          {surveyType.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              answers={answers}
              onChange={handleChange}
              onOpenCamera={setCameraFor}
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-accent text-white font-semibold rounded-xl py-3 active:bg-accent-dark disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Done"}
        </button>
      </div>

      {cameraFor && (
        <CameraCapture onCapture={handleCapture} onClose={() => setCameraFor(null)} />
      )}
    </div>
  );
}