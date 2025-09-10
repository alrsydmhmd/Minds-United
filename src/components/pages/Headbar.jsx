// src/components/Headbar.jsx
export default function Headbar({ username }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">Hi, {username}</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
