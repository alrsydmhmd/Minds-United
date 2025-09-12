// src/layouts/DashboardLayout.jsx
import Sidebar from "../pages/Sidebar";
import Headbar from "../pages/Headbar";
import {useState} from "react";

export default function DashboardLayout({ children, username, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} isOpen={isOpen} />
      <div className="flex-1 flex flex-col">
        <Headbar username={username} toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}
