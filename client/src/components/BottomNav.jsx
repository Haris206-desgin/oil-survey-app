import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User } from "lucide-react";

export default function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium ${
      isActive ? "text-brand-500" : "text-gray-400"
    }`;

  return (
    <nav className="shrink-0 border-t border-gray-200 bg-white flex sticky bottom-0">
      <NavLink to="/" end className={linkClass}>
        <Home size={22} strokeWidth={2.2} />
        Home
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <User size={22} strokeWidth={2.2} />
        Profile
      </NavLink>
    </nav>
  );
}
