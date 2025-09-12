// src/pages/Programs.jsx
import { useState, useEffect } from "react";
import DashboardLayout from "../pages/DashboardLayout";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProgram, setNewProgram] = useState("");
  const [editProgram, setEditProgram] = useState(null);

  // Ambil data programs dari backend
  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/programs");
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetch programs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tambah program
  const handleAdd = async () => {
    if (!newProgram.trim()) return;
    try {
      const res = await fetch("http://localhost:4000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProgram }),
      });
      if (!res.ok) throw new Error("Gagal menambahkan program");
      setNewProgram("");
      fetchPrograms();
    } catch (err) {
      console.error("Error add program:", err);
    }
  };

  // Edit program
  const handleUpdate = async (id) => {
    if (!editProgram?.name.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/api/programs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editProgram.name }),
      });
      if (!res.ok) throw new Error("Gagal update program");
      setEditProgram(null);
      fetchPrograms();
    } catch (err) {
      console.error("Error update program:", err);
    }
  };

  // Hapus program
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus program ini?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/programs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus program");
      fetchPrograms();
    } catch (err) {
      console.error("Error delete program:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Programs Management</h2>

      {/* Form Tambah */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-2">Tambah Program</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            placeholder="Nama program..."
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Tambah
          </button>
        </div>
      </div>

      {/* List Program */}
      <div className="bg-white p-6 rounded-lg shadow">
        {loading ? (
          <p>Loading programs...</p>
        ) : programs.length === 0 ? (
          <p className="text-gray-500">Belum ada data program.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nama Program</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{p.id}</td>
                  <td className="p-2 border">
                    {editProgram?.id === p.id ? (
                      <input
                        type="text"
                        value={editProgram.name}
                        onChange={(e) =>
                          setEditProgram({ ...editProgram, name: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className="p-2 border space-x-2">
                    {editProgram?.id === p.id ? (
                      <button
                        onClick={() => handleUpdate(p.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Simpan
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditProgram(p)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
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
