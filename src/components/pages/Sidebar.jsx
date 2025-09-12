// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Brain,
  FileText,
  Calendar,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Users", path: "/admin/user", icon: <User size={20} /> },
    { name: "Programs", path: "/admin/programs", icon: <BookOpen size={20} /> },
    { name: "Counseling", path: "/dashboard/counseling", icon: <Brain size={20} /> },
    { name: "Articles", path: "/dashboard/articles", icon: <FileText size={20} /> },
    { name: "Events", path: "/dashboard/events", icon: <Calendar size={20} /> },
    { name: "Reports", path: "/dashboard/reports", icon: <BarChart2 size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* Logo / Judul */}
      <div className="px-6 py-4 font-bold text-xl border-b border-gray-700">
        Minds United
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg mb-2 transition-colors ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 p-2 w-full text-left rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
