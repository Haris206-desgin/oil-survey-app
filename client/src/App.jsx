// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./lib/auth.jsx";

// import Login from "./pages/Login.jsx";
// import Home from "./pages/Home.jsx";
// import AllTasks from "./pages/AllTasks.jsx";
// import SiteList from "./pages/SiteList.jsx";
// import SurveyForm from "./pages/SurveyForm.jsx";
// import SiteHistory from "./pages/SiteHistory.jsx";
// import VisitDetail from "./pages/VisitDetail.jsx";
// import Profile from "./pages/Profile.jsx";

// function RequireAuth({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="app-shell items-center justify-center">
//         <p className="text-brand-400 text-sm">Loading…</p>
//       </div>
//     );
//   }
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/"
//         element={
//           <RequireAuth>
//             <Home />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/tasks"
//         element={
//           <RequireAuth>
//             <AllTasks />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/survey/:slug"
//         element={
//           <RequireAuth>
//             <SiteList />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/survey/:slug/site/:siteId"
//         element={
//           <RequireAuth>
//             <SurveyForm />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/survey/:slug/site/:siteId/history"
//         element={
//           <RequireAuth>
//             <SiteHistory />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/visit/:id"
//         element={
//           <RequireAuth>
//             <VisitDetail />
//           </RequireAuth>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <RequireAuth>
//             <Profile />
//           </RequireAuth>
//         }
//       />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }









import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/auth.jsx";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import SiteList from "./pages/SiteList.jsx";
import SurveyForm from "./pages/SurveyForm.jsx";
import SiteHistory from "./pages/SiteHistory.jsx";
import VisitDetail from "./pages/VisitDetail.jsx";
import Profile from "./pages/Profile.jsx";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="app-shell items-center justify-center">
        <p className="text-brand-400 text-sm">Loading…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/tasks"
        element={
          <RequireAuth>
            <AllTasks />
          </RequireAuth>
        }
      />

      {/* Direct SurveyForm (6.png) render hoga default site parameter ke sath */}
      <Route
        path="/survey/:slug"
        element={
          <RequireAuth>
            <SurveyForm />
          </RequireAuth>
        }
      />

      {/* Site selection bypass karne par bhi siteId context handle karega */}
      <Route
        path="/survey/:slug/site/:siteId"
        element={
          <RequireAuth>
            <SurveyForm />
          </RequireAuth>
        }
      />

      {/* Optional: Agar SiteList (5.png) explicit list layout ke liye chahiye ho */}
      <Route
        path="/survey/:slug/sites"
        element={
          <RequireAuth>
            <SiteList />
          </RequireAuth>
        }
      />

      <Route
        path="/survey/:slug/site/:siteId/history"
        element={
          <RequireAuth>
            <SiteHistory />
          </RequireAuth>
        }
      />
      <Route
        path="/visit/:id"
        element={
          <RequireAuth>
            <VisitDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}