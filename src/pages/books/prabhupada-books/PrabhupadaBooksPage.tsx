import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type PrabhupadaBook = {
  id: number;
  book_key: string;
  name: string;
  url: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function PrabhupadaBooksPage() {
  const [books, setBooks] = useState<PrabhupadaBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${API_BASE_URL}/books`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        const result = await response.json();

        if (result.success) {
          setBooks(result.data);
        }
      } catch (error) {
        console.error("Failed to load books", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>

        <div className="mt-8">
          <Link
            to="/books"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Books
          </Link>
        </div>

        <section className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Library
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Prabhupada Books
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-700">
            Read books by A.C. Bhaktivedanta Swami Prabhupada, including Krishna
            Book, Nectar of Devotion, Nectar of Instruction, Śrī Īśopaniṣad, and
            more.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">All Books</h2>

          {loading ? (
            <p className="mt-8 text-slate-600">Loading books...</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/prabhupada/${book.book_key}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src="http://localhost:3000/images/krishna_40.jpeg"
                      alt={book.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                      {book.book_key}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-blue-700">
                      {book.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Explore sections and teachings from this book.
                    </p>

                    <p className="mt-5 text-sm font-semibold text-blue-600">
                      Open book →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}