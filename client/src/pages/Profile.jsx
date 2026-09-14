import React from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ClipboardList } from "lucide-react";
import { useAuth } from "../lib/auth.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="bg-brand-500 text-white px-5 pt-5 pb-10 rounded-b-3xl shrink-0">
        <h1 className="text-lg font-bold">Profile</h1>
      </div>

      <div className="scroll-area px-5 -mt-6 pb-24">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-card p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
            <User size={26} />
          </div>
          <div>
            <p className="font-bold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-400">@{user?.username}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-card mt-4 overflow-hidden">
          <button
            onClick={() => navigate("/tasks")}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50"
          >
            <ClipboardList size={18} className="text-brand-400" />
            <span className="text-sm font-medium text-gray-700">All Tasks</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50"
          >
            <LogOut size={18} className="text-red-400" />
            <span className="text-sm font-medium text-red-500">Log out</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
