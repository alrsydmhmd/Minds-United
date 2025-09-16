import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/1.png";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // Scroll ke bawah -> hide
      } else {
        setShow(true); // Scroll ke atas -> show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`bg-white shadow-md w-full sticky top-0 z-50 transition-transform duration-500 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full shadow-lg"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-gray-900 text-sm">Minds United</span>
            <span className="text-xs text-gray-500">Creative Center</span>
          </div>
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-gray-600">
          <li>
            <button
              onClick={() => scrollToSection("#tentang")}
              className="hover:text-blue-600"
            >
              Tentang
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#program")}
              className="hover:text-blue-600"
            >
              Program
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#layanan")}
              className="hover:text-blue-600"
            >
              Layanan
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("#artikel")}
              className="hover:text-blue-600"
            >
              Artikel
            </button>
          </li>

          Login & Register
          <li>
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Registrasi
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
