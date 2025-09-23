// src/pages/AdminDashboard.jsx
import SidebarAdmin from "./SidebarAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Dashboard Admin</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Peserta Aktif</p>
            <h3 className="text-2xl font-bold text-gray-800">128</h3>
            <p className="text-green-600 text-sm mt-1">+12 bulan ini</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Sesi Konseling</p>
            <h3 className="text-2xl font-bold text-gray-800">56</h3>
            <p className="text-teal-600 text-sm mt-1">+8 dibanding minggu lalu</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Program Berjalan</p>
            <h3 className="text-2xl font-bold text-teal-600">4</h3>
            <p className="text-gray-500 text-sm mt-1">Termasuk "Mindfulness 101"</p>
          </div>
        </div>


        {/* Statistik / Chart Bulanan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Statistik Bulanan - Sesi Konseling
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { week: "Minggu 1", sesi: 12 },
                  { week: "Minggu 2", sesi: 18 },
                  { week: "Minggu 3", sesi: 25 },
                  { week: "Minggu 4", sesi: 20 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sesi" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
