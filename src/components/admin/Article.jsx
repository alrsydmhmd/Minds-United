import { useEffect, useState } from "react";
import SidebarAdmin from "../pages/SidebarAdmin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function ArtikelAdmin() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null); // article being edited or null
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date_published: "",
    author: "",
    slug: ""
  });

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/articles`);
      if (!res.ok) throw new Error("Gagal memuat artikel");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "", image: "", date_published: "", author: "", slug: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API_URL}/api/articles/${editing.id}` : `${API_URL}/api/articles`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form })
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>({message:"Server error"}));
        throw new Error(err.message || "Request failed");
      }
      await fetchArticles();
      resetForm();
    } catch (err) {
      alert("Gagal menyimpan artikel: " + err.message);
    }
  };

  const handleEdit = (article) => {
    setEditing(article);
    setForm({
      title: article.title || "",
      excerpt: article.excerpt || "",
      content: article.content || "",
      image: article.image || "",
      date_published: article.date_published || "",
      author: article.author || "",
      slug: article.slug || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await fetch(`${API_URL}/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      await fetchArticles();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <section className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">📚 Manajemen Artikel</h2>

            {/* Form tambah/edit */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Artikel" : "Tambah Artikel Baru"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Judul" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="border p-2 rounded" />
                <input placeholder="Tanggal (YYYY-MM-DD)" value={form.date_published} onChange={e=>setForm({...form, date_published:e.target.value})} className="border p-2 rounded" />
                <input placeholder="Author" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} className="border p-2 rounded" />
                <input placeholder="Image URL (contoh /images/xxx.jpg atau https://...)" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} className="border p-2 rounded" />
                <input placeholder="Slug (opsional)" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} className="border p-2 rounded" />
                <input placeholder="Excerpt singkat" value={form.excerpt} onChange={e=>setForm({...form, excerpt:e.target.value})} className="border p-2 rounded md:col-span-2" />
                <textarea placeholder="Konten lengkap (opsional)" value={form.content} onChange={e=>setForm({...form, content:e.target.value})} className="border p-2 rounded md:col-span-2" rows={6} />
            </div>

            <div className="mt-4 flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {editing ? "Update Artikel" : "Tambah Artikel"}
                </button>
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded">
                Batal
                </button>
            </div>
            </form>

            {/* Loading / Error */}
            {loading && <p className="text-gray-500">Memuat artikel...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Tabel Artikel */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 text-left">Judul</th>
                    <th className="p-3 text-left">Tanggal</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-center">Aksi</th>
                </tr>
                </thead>
                <tbody>
                {articles.map(a => (
                    <tr key={a.id} className="border-b">
                    <td className="p-3">{a.title}</td>
                    <td className="p-3">{a.date_published || a.created_at?.slice(0,10)}</td>
                    <td className="p-3">{a.author}</td>
                    <td className="p-3 text-center space-x-2">
                        <button onClick={()=>handleEdit(a)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={()=>handleDelete(a.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
                    </td>
                    </tr>
                ))}
                {articles.length === 0 && (
                    <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">Belum ada artikel</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </section>
    </div>
  );
}
