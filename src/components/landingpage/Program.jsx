const programs = [
    {
      title: "Coaching 1-on-1",
      description:
        "Pendampingan pribadi untuk membantu Anda mencapai tujuan pengembangan diri dan mengatasi tantangan hidup.",
      icon: "💬",
    },
    {
      title: "Workshop & Seminar",
      description:
        "Kegiatan kelompok interaktif membahas topik kesehatan mental, manajemen stres, dan pengembangan potensi.",
      icon: "📚",
    },
    {
      title: "Program Perusahaan",
      description:
        "Pelatihan dan program kesehatan mental khusus untuk karyawan, meningkatkan produktivitas dan kesejahteraan.",
      icon: "🏢",
    },
  ];
  
  export default function Program() {
    return (
      <section id="program" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Judul Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Program <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">Unggulan</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Kami merancang program yang membantu Anda berkembang secara holistik, baik secara pribadi maupun profesional.
            </p>
          </div>
  
          {/* Grid Program */}
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                <p className="mt-2 text-gray-600">{program.description}</p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Selengkapnya →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  