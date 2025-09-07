import { FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaInfoCircle, FaListAlt, FaConciergeBell, FaNewspaper } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-lg shadow-lg" />
            <span className="font-bold">Minds United Creative Center</span>
          </div>
          <p className="text-gray-400 text-sm">
            Pusat pertumbuhan diri dan kesehatan mental.  
            Kolaborasi kreatif untuk hidup yang lebih bermakna.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#tentang" className="flex items-center gap-2 hover:text-white">
                <FaInfoCircle /> Tentang
              </a>
            </li>
            <li>
              <a href="#program" className="flex items-center gap-2 hover:text-white">
                <FaListAlt /> Program
              </a>
            </li>
            <li>
              <a href="#layanan" className="flex items-center gap-2 hover:text-white">
                <FaConciergeBell /> Layanan
              </a>
            </li>
            <li>
              <a href="#artikel" className="flex items-center gap-2 hover:text-white">
                <FaNewspaper /> Artikel
              </a>
            </li>
          </ul>
        </div>


        {/* Kontak */}
        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:hello@mindsunited.id"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <FaEnvelope /> hello@mindsunited.id
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/mindsunited"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <FaLinkedin /> Linkedin 
              </a>
            </li>
          </ul>
        </div>

        {/* Konsultasi Gratis Singkat */}
        <div>
          <h4 className="font-semibold mb-3">Konsultasi Gratis</h4>
          <p className="text-gray-400 text-sm mb-4">
            Masukan data singkat anda untuk memulai konsultasi.
          </p>
          <input 
            type="text" 
            placeholder="Nama Anda"
            className="w-full px-3 py-2 rounded-mg bg-gray-800 text-gray-200 border border-gray-700 mb-3" 
          />
          <input 
            type="text" 
            placeholder="Email Anda"
            className="w-full px-3 py-2 rounded-mg bg-gray-800 text-gray-200 border border-gray-700 mb-3" 
          />
          <button className="w-full bg-gradient-to-tr from-blue-500 to-teal-400 py-2 rounded-mg text-white">
            Kirim
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2025 Minds United Creative Center. All rights reserved.
      </div>
    </footer>
  );
}
