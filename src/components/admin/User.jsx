// src/pages/DashboardAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";
import defaultAvatar from "../../assets/1.png"; // ganti sesuai gambar lokal

export default function User() {
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState(""); // untuk tambah user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = localStorage.getItem("Username") || "Admin";

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

  // Tambah User
  const handleAddUser = async () => {
    if (!username || !password) {
      alert("Username dan password wajib diisi");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal tambah user");

      alert(data.message || "User berhasil ditambahkan");
      setUsername("");
      setPassword("");
      setRole("user");
      fetchUsers();
    } catch (err) {
      console.error("Error add user:", err);
      alert(err.message);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setEditUser(user);
    setUsername(user.username);
    setRole(user.role);
    setPassword(""); // kosongkan password (tidak wajib edit)
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role }),
      });

      if (!res.ok) throw new Error("Gagal update user");
      await fetchUsers();
      setEditUser(null);
      setUsername("");
      setRole("user");
    } catch (error) {
      console.error("Error update:", error);
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
        fetchUsers();
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
    <DashboardLayout username={loggedInUser} onLogout={handleLogout}>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {/* Form Tambah / Edit User */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editUser ? "Edit User" : "Tambah User"}
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-2 rounded w-full md:w-1/3"
          />
          {!editUser && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded w-full md:w-1/3"
            />
          )}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-4 flex gap-4">
          {editUser ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditUser(null);
                  setUsername("");
                  setRole("user");
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={handleAddUser}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Tambah
            </button>
          )}
        </div>
      </div>

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
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
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