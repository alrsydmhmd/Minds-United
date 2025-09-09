import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminToken, setAdminToken] = useState(""); // token khusus admin
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role, adminToken })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate("/signin");
      }
    } catch (err) {
      alert("Gagal register: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrasi</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded mb-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Token admin hanya tampil kalau role = admin */}
        {role === "admin" && (
          <input
            type="text"
            placeholder="Admin Token"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
        )}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Daftar
        </button>
      </form>
    </div>
  );
}
