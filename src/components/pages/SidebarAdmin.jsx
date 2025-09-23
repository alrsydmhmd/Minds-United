// src/components/SidebarAdmin.jsx
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  NewspaperIcon,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Newspaper,
} from "lucide-react";

export default function SidebarAdmin() {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/user" },
    { title: "Kelola Pengguna", icon: <Users size={18} />, link: "/admin/user" },
    { title: "Program", icon: <BookOpen size={18} />, link: "/admin/program" },
    { title: "Article", icon: <NewspaperIcon size={18} />, link: "/admin/article" },
    { title: "Laporan", icon: <BarChart3 size={18} />, link: "/admin/reports" },
    { title: "Pengaturan", icon: <Settings size={18} />, link: "/admin/settings" },
  ];

  const supportItems = [
    { title: "Bantuan", icon: <HelpCircle size={18} />, link: "/admin/help" },
    { title: "Keluar", icon: <LogOut size={18} />, action: "logout" },
  ];

  const handleLogout = () => {
    // Hapus data login (misalnya token di localStorage)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Arahkan ke halaman login
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm rounded-r-2xl">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-lg font-bold text-teal-600">Minds United</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 mb-2">MENU</p>
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
          >
            {item.icon}
            {item.title}
          </Link>
        ))}

        <p className="text-xs font-semibold text-gray-400 mt-6 mb-2">SUPPORT</p>
        {supportItems.map((item, idx) =>
          item.action === "logout" ? (
            <button
              key={idx}
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 transition text-left"
            >
              {item.icon}
              {item.title}
            </button>
          ) : (
            <Link
              key={idx}
              to={item.link}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
            >
              {item.icon}
              {item.title}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
