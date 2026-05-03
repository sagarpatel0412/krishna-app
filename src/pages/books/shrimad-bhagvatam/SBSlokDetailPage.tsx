import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSBSlok } from "../../../services/sbService";
import type { SBSlok } from "../../../types/sb";
import AskAIChat from "../../../components/ai-chat/AskAIChat";
import VoiceButton from "../../../components/voice/VoiceButton";

export default function SBSlokDetailPage() {
  const { cantoNumber, chapterNumber, verseKey } = useParams();

  const [slok, setSlok] = useState<SBSlok | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cantoNumber || !chapterNumber || !verseKey) return;

    getSBSlok(cantoNumber, chapterNumber, verseKey)
      .then(setSlok)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cantoNumber, chapterNumber, verseKey]);

  console.log("slok", slok);

  if (loading) {
    return <p className="p-10 text-slate-600">Loading verse...</p>;
  }

  if (!slok) {
    return <p className="p-10 text-slate-600">Verse not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <Link
          to={`/books/srimad-bhagavatam/canto/${cantoNumber}/chapter/${chapterNumber}`}
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to Chapter {chapterNumber}
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Srimad Bhagavatam
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {slok.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Canto {slok.canto_number}, Chapter {slok.chapter_number}, Verse{" "}
            {slok.verse_key}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-blue-700">
            Devanagari
          </h2>

          <p className="text-center text-xl font-medium leading-10 text-slate-800">
            {slok.devanagari}
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-blue-700">
            Verse Text
          </h2>

          <p className="text-slate-700 leading-8">{slok.verse_text}</p>
          <VoiceButton text={slok.verse_text} label="Verse" />
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-blue-700">Synonyms</h2>

          <p className="text-slate-700 leading-8">{slok.synonyms}</p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-blue-700">
            Translation
          </h2>

          <p className="text-slate-800 leading-8">{slok.translation}</p>
          <VoiceButton text={slok.translation} label="Translation" />
        </div>

        {slok.purport && (
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-lg font-semibold text-blue-700">
              Purport
            </h2>

            <p className="whitespace-pre-line text-slate-700 leading-8">
              {slok.purport}
            </p>
            <VoiceButton text={slok.purport} label="Purport" />
          </div>
        )}
      </section>
      <AskAIChat
        context={{
          book: "Srimad Bhagavatam",
          cantoNumber,
          chapterNumber,
          verseKey,
          title: slok.title,
          devanagari: slok.devanagari,
          verse_text: slok.verse_text,
          synonyms: slok.synonyms,
          translation: slok.translation,
          purport: slok.purport,
        }}
      />
    </main>
  );
}
