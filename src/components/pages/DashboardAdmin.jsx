// src/pages/DashboardAdmin.jsx
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <DashboardLayout username={username} onLogout={handleLogout}>
      <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
      <p>This is your main admin control panel.</p>
    </DashboardLayout>
  );
}
