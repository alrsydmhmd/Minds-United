export default function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-lg mb-4" />
            <h3 className="text-lg font-bold text-white">Minds United Creative Center</h3>
            <p className="mt-2 text-sm text-gray-400">
              Pusat pertumbuhan diri dan kesehatan mental. Kolaborasi kreatif untuk hidup yang lebih bermakna.
            </p>
          </div>
  
          {/* Navigasi */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigasi</h4>
            <ul className="space-y-2">
              <li><a href="#tentang" className="hover:text-white">Tentang</a></li>
              <li><a href="#program" className="hover:text-white">Program</a></li>
              <li><a href="#layanan" className="hover:text-white">Layanan</a></li>
              <li><a href="#artikel" className="hover:text-white">Artikel</a></li>
            </ul>
          </div>
  
          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-3">Kontak</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@mindsunited.id" className="hover:text-white">hello@mindsunited.id</a></li>
              <li><a href="tel:+620000000000" className="hover:text-white">+62 000-0000-000</a></li>
              <li><a href="https://www.instagram.com/kami.mindsunited?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-white">@kami.mindsunited</a></li>
            </ul>
          </div>
  
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-3">Newsletter</h4>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-tr from-blue-500 to-teal-400 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
          © {year} Minds United Creative Center. All rights reserved.
        </div>
      </footer>
    );
  }
  