import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Book = {
  id: number;
  book_key: string;
  name: string;
};

type BookSection = {
  id: number;
  section_key: string;
  title: string;
  order_index: number;
};

export default function PrabhupadaBookDetailPage() {
  const { bookKey } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [sections, setSections] = useState<BookSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookKey) return;

    async function fetchBookSections() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/books/${bookKey}/sections`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setBook(result.book);
          setSections(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookSections();
  }, [bookKey]);

  console.log(book,'book')

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Loading book...</p>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="min-h-screen bg-blue-50 p-10">
        <p className="text-slate-700">Book not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>

        <div className="mt-8">
          <Link
            to="/books/prabhupada"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Books
          </Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Prabhupada Books
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                {book.name}
              </h1>

              <p className="mt-6 leading-8 text-slate-700">
                Explore teachings, chapters, lectures, and spiritual insights
                from this book.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4">
                  <p className="text-2xl font-bold text-blue-700">
                    {sections.length}
                  </p>

                  <p className="text-sm text-slate-600">Sections</p>
                </div>
              </div>
            </div>

            <div className="h-80 md:h-auto">
              <img
                src="http://localhost:3000/images/krishna_40.jpeg"
                alt={book.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Sections & Chapters
          </h2>

          {sections.length === 0 ? (
            <p className="mt-8 text-slate-600">
              No sections available for this book.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={`/books/prabhupada/${book.book_key}/section/${section.section_key}`}
                  className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                      {section.order_index || "#"}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-600">
                        Section {section.section_key}
                      </p>

                      <h3 className="mt-1 text-lg font-bold leading-7 text-slate-900 group-hover:text-blue-700">
                        {section.title}
                      </h3>

                      <p className="mt-4 text-sm font-semibold text-blue-600">
                        Open section →
                      </p>
                    </div>
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