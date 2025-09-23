import { useEffect, useState } from "react";
import SidebarAdmin from "../pages/SidebarAdmin";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "user" });
  const [editUser, setEditUser] = useState(null);

  // Ambil data dari backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Tambah user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      setNewUser({ username: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error("Add user error:", err);
    }
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/api/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update user error:", err);
    }
  };

  // Hapus user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await fetch(`http://localhost:4000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Kelola User</h2>

        {/* Form Tambah User */}
        {!editUser ? (
          <form onSubmit={handleAddUser} className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Tambah User Baru</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
              Tambah User
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdateUser} className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={editUser.username}
                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Update
              </button>
              <button type="button" onClick={() => setEditUser(null)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Daftar User */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg overflow-hidden border border-gray-100">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setEditUser(u)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    Belum ada user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
