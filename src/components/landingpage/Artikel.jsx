import Stress from '../../assets/stress.jpg'
import Self from '../../assets/self.jpg'
import Mind from '../../assets/mind.webp'

const articles = [
    {
      title: "5 Cara Mengelola Stres di Tengah Kesibukan",
      excerpt:
        "Pelajari strategi sederhana namun efektif untuk mengatasi stres dan menjaga kesehatan mental Anda.",
      image: Stress,
      date: "5 September 2025",
      link: "#",
    },
    {
      title: "Pentingnya Self-Awareness dalam Pengembangan Diri",
      excerpt:
        "Kesadaran diri adalah langkah awal menuju perubahan positif. Berikut adalah tips membangunnya.",
      image: Self,
      date: "1 September 2025",
      link: "#",
    },
    {
      title: "Mindfulness: Seni Hidup di Saat Ini",
      excerpt:
        "Mindfulness dapat membantu mengurangi kecemasan dan meningkatkan kualitas hidup Anda.",
      image: Mind,
      date: "28 Agustus 2025",
      link: "#",
    },
  ];
  
  export default function Artikel() {
    return (
      <section id="artikel" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Judul Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Artikel <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-teal-400">Terbaru</span>
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Dapatkan wawasan dan tips seputar kesehatan mental, pengembangan diri, dan gaya hidup positif.
            </p>
          </div>
  
          {/* Grid Artikel */}
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-video object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500">{article.date}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{article.excerpt}</p>
                  <div className="mt-4">
                    <a
                      href={article.link}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Baca selengkapnya →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  