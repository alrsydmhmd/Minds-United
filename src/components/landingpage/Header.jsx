import Minds from "../../assets/mind.jpg"

export default function Header() {
    return (
      <section id="home" className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
              Pengembangan Diri • Kesehatan Mental
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-2">
              Temani Perjalanan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">
                Belajar Diri
              </span>{" "}
              & Kesehatan Mental Anda
            </h1>
            <p className="mt-4 text-gray-600 max-w-lg">
              Minds United Creative Center membantu individu dan tim membangun kebiasaan yang berkelanjutan, mengelola stres, serta tumbuh dengan pikiran yang lebih jernih.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#mulai" className="bg-gradient-to-tr from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90">
                Mulai Perjalanan
              </a>
              <a href="#konsultasi" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                Jadwalkan Konsultasi
              </a>
            </div>
            <div className="mt-8 flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-sm text-gray-500">Peserta Workshop</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">30+</p>
                <p className="text-sm text-gray-500">Perusahaan & Komunitas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-500">Kepuasan Klien</p>
              </div>
            </div>
          </div>
  
          {/* Ilustrasi */}
          <div className="relative w-full h-80 md:h-full flex items-center justify-center">
            <div className="absolute w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30 top-0 left-0"></div>
            <div className="absolute w-60 h-60 bg-teal-300 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>
            <img
              src={Minds}
              alt="Ilustrasi"
              className="rounded-lg shadow-lg w-[400px] h-[450px] object-cover"
            />
          </div>
        </div>
      </section>
    );
  }
  