export default function StatCard({ title, value, icon }) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
        <div className="text-blue-600 text-3xl">{icon}</div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    );
  }
  