import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AskAIChat from "../../../components/ai-chat/AskAIChat";
import VoiceButton from "../../../components/voice/VoiceButton";
import PageContainer from "../../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const LANGUAGE_OPTIONS = [
  { code: "hi", label: "Hindi" },
  { code: "gu", label: "Gujarati" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
];

type BookContentResponse = {
  book: {
    id: number;
    book_key: string;
    name: string;
    url: string;
  };
  section: {
    id: number;
    book_id: number;
    section_key: string;
    title: string;
    order_index: number;
    url: string;
  };
  id: number;
  title: string;
  url: string;
  content: string;
  format: "html" | "text";
};

export default function PrabhupadaBookSectionPage() {
  const { bookKey, sectionKey } = useParams();

  const [data, setData] = useState<BookContentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [languageCode, setLanguageCode] = useState("hi");
  const [translatedContent, setTranslatedContent] = useState("");

  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationError, setTranslationError] = useState("");

  useEffect(() => {
    if (!bookKey || !sectionKey) return;

    async function fetchContent() {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/books/${bookKey}/sections/${sectionKey}/content?format=html`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to load book content", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [bookKey, sectionKey]);

  async function handleTranslateContent() {
    if (!data?.id) return;

    try {
      setTranslationLoading(true);
      setTranslationError("");

      const response = await fetch(`${API_BASE_URL}/t/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          source_type: "book_content",
          id: data.id,
          field: "content",
          language_code: languageCode,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Translation failed");
      }

      setTranslatedContent(result.translated_text || "");
    } catch (error: any) {
      setTranslationError(error.message);
    } finally {
      setTranslationLoading(false);
    }
  }

  const removeUnwantedSections = (html:any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove top language/view section
    const topSection = doc.querySelector(".select-none.mb-6.font-sans");
    if (topSection) {
        topSection.remove();
    }

    // Remove bottom navigation section
    const bottomSection = doc.querySelector(".mt-10.flex.justify-between");
    if (bottomSection) {
        bottomSection.remove();
    }

    return doc.body.innerHTML;
  };

  if (loading) {
    return <p className="p-10 text-slate-600">Loading section...</p>;
  }

  if (!data) {
    return <p className="p-10 text-slate-600">Section not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>


        <div className="mt-8">
          <Link
            to={`/books/prabhupada/${bookKey}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to {data.book.name}
          </Link>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {data.book.name}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {data.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Section {data.section.section_key}
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-md">
          <label className="text-sm font-semibold text-slate-700">
            Translate content to
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <select
              value={languageCode}
              onChange={(e) => {
                setLanguageCode(e.target.value);
                setTranslatedContent("");
                setTranslationError("");
              }}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:max-w-xs"
            >
              {LANGUAGE_OPTIONS.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleTranslateContent}
              disabled={translationLoading}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {translationLoading ? "Translating..." : "Translate Content"}
            </button>
          </div>

          {translationError && (
            <p className="mt-3 text-sm text-red-600">{translationError}</p>
          )}
        </div>

        <article className="mt-8 rounded-3xl bg-white p-6 shadow-md md:p-8">
          <div
            className="prose max-w-none prose-slate prose-headings:text-slate-900 prose-p:leading-8 prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: removeUnwantedSections(data.content) }}
          />
        </article>

        {translatedContent && (
          <article className="mt-8 rounded-3xl bg-blue-50 p-6 shadow-md md:p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              AI Translation
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              {data.title}
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-slate-800">
              {translatedContent}
            </p>

            <div className="mt-5">
              <VoiceButton text={translatedContent} label="Read Translation" />
            </div>
          </article>
        )}

        <div className="mt-6">
          <VoiceButton text={data.title} label="Read Title" />
        </div>
      </PageContainer>

      <AskAIChat
        context={{
          book: data.book.name,
          section: data.section.title,
          title: data.title,
          content: translatedContent || data.content,
        }}
      />
    </main>
  );
}