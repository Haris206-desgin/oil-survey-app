// import React, { useState } from "react";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import { ClipboardList } from "lucide-react";
// import { useAuth } from "../lib/auth.jsx";

// export default function Login() {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [username, setUsername] = useState("testuser");
//   const [password, setPassword] = useState("password123");
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   if (user) return <Navigate to="/" replace />;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await login(username, password);
//       const dest = location.state?.from || "/";
//       navigate(dest, { replace: true });
//     } catch (err) {
//       setError(err.message || "Could not sign in");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="app-shell justify-center px-6">
//       <div className="mx-auto w-full max-w-sm">
//         <div className="flex flex-col items-center mb-10">
//           <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-4">
//             <ClipboardList className="text-white" size={30} />
//           </div>
//           <h1 className="text-2xl font-bold text-brand-600">Cariant Field Survey</h1>
//           <p className="text-gray-500 text-sm mt-1">Sign in to start your visits</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Username</label>
//             <input
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="username"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
//             <input
//               type="password"
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//             />
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full rounded-xl bg-accent text-white font-semibold py-3 mt-2 active:bg-accent-dark disabled:opacity-60"
//           >
//             {submitting ? "Signing in…" : "Sign in"}
//           </button>
//         </form>

//         <p className="text-center text-xs text-gray-400 mt-6">
//           Demo credentials are pre-filled — just tap Sign in.
//         </p>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import { ClipboardList } from "lucide-react";
// import { useAuth } from "../lib/auth.jsx";

// export default function Login() {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   if (user) return <Navigate to="/" replace />;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await login(username, password);
//       const dest = location.state?.from || "/";
//       navigate(dest, { replace: true });
//     } catch (err) {
//       setError(err.message || "Could not sign in");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="app-shell justify-center px-6">
//       <div className="mx-auto w-full max-w-sm">
//         <div className="flex flex-col items-center mb-10">
//           <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-4">
//             <ClipboardList className="text-white" size={30} />
//           </div>
//           <h1 className="text-2xl font-bold text-brand-600">Cariant Field Survey</h1>
//           <p className="text-gray-500 text-sm mt-1">Sign in to start your visits</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Username</label>
//             <input
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               autoComplete="username"
//             />
//           </div>
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
//             <input
//               type="password"
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               autoComplete="current-password"
//             />
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full rounded-xl bg-accent text-white font-semibold py-3 mt-2 active:bg-accent-dark disabled:opacity-60"
//           >
//             {submitting ? "Signing in…" : "Sign in"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import { ClipboardList, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../lib/auth.jsx";

// export default function Login() {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   if (user) return <Navigate to="/" replace />;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       await login(username, password);
//       const dest = location.state?.from || "/";
//       navigate(dest, { replace: true });
//     } catch (err) {
//       setError(err.message || "Could not sign in");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="app-shell justify-center px-6">
//       <div className="mx-auto w-full max-w-sm">
//         <div className="flex flex-col items-center mb-10">
//           <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-4">
//             <ClipboardList className="text-white" size={30} />
//           </div>
//           <h1 className="text-2xl font-bold text-brand-600">Cariant Field Survey</h1>
//           <p className="text-gray-500 text-sm mt-1">Sign in to start your visits</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Username</label>
//             <input
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               autoComplete="username"
//             />
//           </div>

//           <div>
//             <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm focus:border-brand-400 focus:outline-none"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full rounded-xl bg-accent text-white font-semibold py-3 mt-2 active:bg-accent-dark disabled:opacity-60 transition-colors"
//           >
//             {submitting ? "Signing in…" : "Sign in"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { ClipboardList, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../lib/auth.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      const dest = location.state?.from || "/";
      navigate(dest, { replace: true });
    } catch (err) {
      // Backend se bheja gaya exact error message display hoga
      setError(err.message || "Invalid username and password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell justify-center px-6">
      <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-4">
            <ClipboardList className="text-white" size={30} />
          </div>
          <h1 className="text-2xl font-bold text-brand-600">Cariant Field Survey</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to start your visits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Username</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm focus:border-brand-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-accent text-white font-semibold py-3 mt-2 active:bg-accent-dark disabled:opacity-60 transition-colors"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}