export default function About() {
    return (
      <section id="tentang" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Gambar / Ilustrasi */}
          <div className="relative">
            <div className="absolute w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30 top-0 left-0"></div>
            <div className="absolute w-60 h-60 bg-teal-200 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>
            <img
              src="https://via.placeholder.com/500x350"
              alt="Tentang Minds United Creative Center"
              className="relative z-10 rounded-lg shadow-lg"
            />
          </div>
  
          {/* Teks */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tentang <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">Minds United</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Minds United Creative Center adalah pusat pengembangan diri dan kesehatan mental yang berkomitmen membantu individu, komunitas, dan perusahaan
              untuk tumbuh secara holistik. Kami percaya bahwa kesehatan mental dan potensi diri adalah pondasi untuk hidup yang lebih bermakna.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Melalui sesi coaching, workshop, dan program edukasi, kami memfasilitasi perjalanan transformasi setiap orang untuk lebih mengenal diri, mengelola stres,
              meningkatkan kepercayaan diri, dan membangun kebiasaan positif yang berkelanjutan.
            </p>
            <div className="mt-6">
              <a
                href="#program"
                className="inline-block bg-gradient-to-tr from-blue-500 to-teal-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90"
              >
                Lihat Program Kami
              </a>
            </div>
          </div>
  
        </div>
      </section>
    );
  }
  