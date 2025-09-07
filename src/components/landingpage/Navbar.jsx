import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-lg shadow-lg" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-gray-900 text-sm">Minds United</span>
            <span className="text-xs text-gray-500">Creative Center</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-600">
          <li><a href="#tentang" className="hover:text-gray-900">Tentang</a></li>
          <li><a href="#program" className="hover:text-gray-900">Program</a></li>
          <li><a href="#layanan" className="hover:text-gray-900">Layanan</a></li>
          <li><a href="#artikel" className="hover:text-gray-900">Artikel</a></li>
          <li>
            <a href="#konsultasi" className="bg-gradient-to-tr from-blue-500 to-teal-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90">
              Konsultasi Gratis
            </a>
          </li>
        </ul>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-gray-800"></span>
            <span className="block w-5 h-0.5 bg-gray-800"></span>
            <span className="block w-5 h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <ul className="flex flex-col gap-4 p-4 text-gray-600">
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#program">Program</a></li>
            <li><a href="#layanan">Layanan</a></li>
            <li><a href="#artikel">Artikel</a></li>
            <li>
              <a href="#konsultasi" className="bg-gradient-to-tr from-blue-500 to-teal-400 text-white px-4 py-2 rounded-lg shadow">
                Konsultasi Gratis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
