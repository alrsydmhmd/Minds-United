export default function Testimoni() {
    const testimonials = [
      {
        name: "Budi Santoso",
        role: "Peserta Workshop",
        text: "Mengikuti program di Minds United Creative Center benar-benar mengubah cara saya melihat diri sendiri. Materinya aplikatif dan pembicaranya sangat inspiratif!",
        image: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Siti Rahmawati",
        role: "HR Manager",
        text: "Tim kami menjadi lebih solid setelah mengikuti pelatihan pengembangan diri. Staf juga lebih produktif dan kreatif dalam bekerja.",
        image: "https://i.pravatar.cc/100?img=2",
      },
      {
        name: "Andi Wijaya",
        role: "Mahasiswa",
        text: "Sesi konsultasinya membantu saya mengelola stres dan lebih fokus pada studi. Saya merasa lebih percaya diri.",
        image: "https://i.pravatar.cc/100?img=3",
      },
    ];
  
    return (
      <section id="testimoni" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Apa Kata Mereka
          </h2>
  
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  