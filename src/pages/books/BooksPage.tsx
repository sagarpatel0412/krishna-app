import { Link } from "react-router-dom";

const books = [
  {
    title: "Bhagavad Gita",
    short: "BG",
    desc: "Krishna’s timeless guidance to Arjuna.",
    link: "/books/bhagavad-gita",
    img: "http://localhost:3000/images/krishna_50.jpeg",
  },
  {
    title: "Srimad Bhagavatam",
    short: "SB",
    desc: "Pure devotional wisdom and Krishna’s pastimes.",
    link: "/books/srimad-bhagavatam",
    img: "http://localhost:3000/images/krishna_40.jpeg",
  },
  {
    title: "Chaitanya Charitamrita",
    short: "CC",
    link: "/books/chaitanya-charitamrita",
    desc: "Teachings and life of Sri Chaitanya Mahaprabhu.",
    img: "http://localhost:3000/images/krishna_21.jpeg",
  },
  {
    title: "Prabhupada Books",
    short: "SP",
    desc: "Books and lectures by Srila Prabhupada.",
    link: "",
    img: "http://localhost:3000/images/krishna_46.jpeg",
  },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">Krishna Wisdom</h1>

          <div className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#" className="hover:text-blue-700">
              Books
            </a>
            <a href="#" className="hover:text-blue-700">
              Gallery
            </a>
            <a href="#" className="hover:text-blue-700">
              About
            </a>
          </div>
        </nav>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700">
            Sacred Books
          </h1>
          <p className="mt-3 text-slate-600">
            Explore the divine knowledge of Krishna consciousness
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <Link to={book.link}>
              <div
                key={book.short}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Short label */}
                  <div className="absolute top-3 left-3 bg-white/90 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {book.short}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold leading-tight">
                      {book.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <p className="text-sm text-slate-600 leading-6">
                    {book.desc}
                  </p>

                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                    Open Book →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
