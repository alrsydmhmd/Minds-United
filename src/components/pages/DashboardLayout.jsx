// src/layouts/DashboardLayout.jsx
import Sidebar from "../pages/Sidebar";
import Headbar from "../pages/Headbar";

export default function DashboardLayout({ children, username, onLogout }) {
  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Headbar username={username} />
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}
