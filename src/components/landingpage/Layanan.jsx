const services = [
    {
      title: "Konsultasi Psikolog",
      description:
        "Sesi konsultasi dengan psikolog profesional untuk membantu mengatasi stres, kecemasan, dan masalah pribadi.",
      icon: "🧠",
    },
    {
      title: "Life Coaching",
      description:
        "Pendampingan untuk membantu Anda mencapai tujuan hidup, meningkatkan motivasi, dan membangun kebiasaan positif.",
      icon: "🌱",
    },
    {
      title: "Pelatihan Tim",
      description:
        "Program pelatihan untuk meningkatkan komunikasi, kerja sama, dan kesejahteraan karyawan di perusahaan.",
      icon: "🤝",
    },
    {
      title: "Support Group",
      description:
        "Kelompok dukungan bagi individu yang ingin berbagi pengalaman dan mendapat dorongan positif dari komunitas.",
      icon: "💬",
    },
    {
      title: "Mindfulness Class",
      description:
        "Kelas meditasi dan mindfulness untuk membantu Anda fokus, rileks, dan menjaga kesehatan mental.",
      icon: "🧘‍♂️",
    },
    {
      title: "Workshop Edukasi",
      description:
        "Workshop interaktif untuk meningkatkan pemahaman tentang kesehatan mental dan pengembangan diri.",
      icon: "📚",
    },
  ];
  
  export default function Layanan() {
    return (
      <section id="layanan" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Judul Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Layanan <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">Kami</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan yang dirancang untuk mendukung kesehatan mental dan pengembangan diri Anda.
            </p>
          </div>
  
          {/* Grid Layanan */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  