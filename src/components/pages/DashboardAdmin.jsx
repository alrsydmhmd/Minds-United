// src/pages/DashboardAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import defaultAvatar from "../../assets/1.png"; // ganti sesuai gambar lokal

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // Ambil data users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Hapus user
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus user ini?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchUsers(); // refresh data
      } else {
        alert(data.error || data.message);
      }
    } catch (err) {
      console.error("Error delete user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout username={username} onLogout={handleLogout}>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* List Users */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Daftar Pengguna</h3>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">Belum ada data user.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Avatar</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{u.id}</td>
                  <td className="p-2 border">{u.username}</td>
                  <td className="p-2 border capitalize">{u.role}</td>
                  <td className="p-2 border">
                    <img
                      src={defaultAvatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
