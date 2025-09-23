import { useEffect, useState } from "react";
import SidebarAdmin from "../pages/SidebarAdmin";

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ title: "", description: "", icon: "📌" });

  // Ambil data dari backend
  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/programs");
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Submit program baru
  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProgram),
      });
      if (res.ok) {
        setNewProgram({ title: "", description: "", icon: "📌" });
        fetchPrograms(); // refresh daftar
      }
    } catch (err) {
      console.error("Add program error:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Kelola Program</h2>

        {/* Form Tambah Program */}
        <form
          onSubmit={handleAddProgram}
          className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4">Tambah Program Baru</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Judul Program"
              value={newProgram.title}
              onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Ikon (emoji)"
              value={newProgram.icon}
              onChange={(e) => setNewProgram({ ...newProgram, icon: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Deskripsi Program"
              value={newProgram.description}
              onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
              className="border p-2 rounded md:col-span-3"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Tambah Program
          </button>
        </form>

        {/* Daftar Program */}
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{program.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{program.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{program.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
