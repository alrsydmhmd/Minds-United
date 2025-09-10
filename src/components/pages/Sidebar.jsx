// src/components/Sidebar.jsx
import { Home, Users, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/dashboard-admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <Home size={20} /> Home
        </Link>
        <Link to="/users" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <Users size={20} /> Users
        </Link>
        <Link to="/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
          <Settings size={20} /> Settings
        </Link>
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 p-4 border-t border-gray-700 hover:bg-red-600"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}
