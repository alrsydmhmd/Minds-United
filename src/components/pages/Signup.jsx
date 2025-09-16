import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password }), // ✅ kirim semua data
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* Kiri (form) */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <img src="/logo-minds.png" alt="Minds United Creative Center" className="w-32" />
          </div>

          <div className="mt-10 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-indigo-600">Daftar Akun</h1>
            <p className="mt-2 text-gray-600 text-center text-sm">
              Bergabung dengan <span className="font-semibold">Minds United Creative Center</span>  
              untuk pengembangan diri & kesehatan mental.
            </p>

            <form onSubmit={handleSignUp} className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                             placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white"
                  type="text"
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                             placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white mt-4"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 
                             placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white mt-4"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="mt-6 tracking-wide font-semibold bg-indigo-600 text-white 
                             w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 
                             ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Daftar</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Kanan (gambar ilustrasi) */}
        <div className="flex-1 bg-indigo-50 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://undraw.co/api/illustrations/3bceaa6d-1812-4f53-8d77-7e4a60f3cfbb')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
