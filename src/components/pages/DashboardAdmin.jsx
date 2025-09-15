// src/pages/DashboardLayout.jsx
import { useState } from "react";
import { Menu } from "lucide-react"; // ikon hamburger
import { Link } from "react-router-dom";

export default function DashboardLayout({ children, username, onLogout }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-lg font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Minds United
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <Menu />
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          <li>
            <Link
              to="/admin"
              className="flex items-center gap-2 p-2 hover:bg-gray-700"
            >
              📊 <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user"
              className="flex items-center gap-2 p-2 hover:bg-gray-700"
            >
              👥 <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/programs"
              className="flex items-center gap-2 p-2 hover:bg-gray-700"
            >
              📚 <span className={`${isOpen ? "block" : "hidden"}`}>Programs</span>
            </Link>
          </li>
          {/* Tambahkan menu lain sesuai kebutuhan */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-3">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <div className="flex items-center gap-4">
            <span>Hi, {username}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
