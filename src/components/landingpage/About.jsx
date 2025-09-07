import Team from "../../assets/team.jpg"

export default function About() {
    return (
      <section id="tentang" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Gambar / Ilustrasi */}
          <div className="relative">
            <div className="absolute w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30 top-0 left-0"></div>
            <div className="absolute w-60 h-60 bg-teal-200 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>
            <img
              src={Team}
              alt="Tentang Minds United Creative Center"
              className="relative z-10 rounded-lg shadow-lg object-cover"
            />
          </div>
  
          {/* Teks */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tentang <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">Minds United</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Minds United Creative Center adalah pusat kreatif yang berfokus pada pengembangan diri, kesehatan, dan mental health bagi generasi muda. Bernaung di bawah Yayasan
              Sinergi Aksi Peduli Bidang Kreatifitas dan Kesehatan, MUCC menggabungkan pendekatan kreatif melalui konten digital, teknologi AI, dan media interaktif untuk mendukung pembelajaran yang menyenangkan sekaligus bermanfaat.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Visi kami adalah menciptakan ruang bagi anak muda untuk berkarya sekaligus menjaga keseimbangan diri, baik secara emosianal maupun mental.
              Program yang kami jalankan meliputi kelas pengembangan diri, kampanye kesehatan, hingga kolaboratif kreatif dengan komunitas dan tenaga profesional.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Kami percaya bahwa magang di MUCC bukan hanya soal menghasilkan karya kreatif, tetapi juga perjalanan membangun kepekaan, empati, dan keseimbangan hidup.
              kehadiran teman - teman magang akan menjadi energi baru untuk terus tunbuh dan berkontribusi bersama.
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
  