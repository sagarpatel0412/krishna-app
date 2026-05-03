import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGitaSlok } from "../../../services/gitaService";
import AskAIChat from "../../../components/ai-chat/AskAIChat";
import VoiceButton from "../../../components/voice/VoiceButton";

export default function GitaSlokDetailPage() {
  const { chapterNumber, verseNumber } = useParams();

  const [slok, setSlok] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterNumber || !verseNumber) return;

    getGitaSlok(chapterNumber, verseNumber)
      .then(setSlok)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [chapterNumber, verseNumber]);

  console.log(slok);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!slok) return <p className="p-10">No data</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-10">
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
        {/* Back */}
      </section>
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="my-10">
          <Link
            to={`/books/bhagavad-gita/chapter/${chapterNumber}`}
            className="text-sm font-semibold text-blue-700 hover:underline "
          >
            ← Back to Chapter {chapterNumber}
          </Link>
        </div>
        {/* Header */}
        <div className="mt-6 rounded-3xl bg-white p-8 shadow-xl text-center">
          <p className="text-sm font-semibold text-blue-600">Bhagavad Gita</p>

          <h1 className="mt-2 text-3xl font-bold">
            Chapter {chapterNumber}, Verse {verseNumber}
          </h1>

          <p className="mt-2 text-sm text-slate-500">{slok.data.api_id}</p>
        </div>

        {/* Sanskrit */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Sanskrit</h2>

          <p className="whitespace-pre-line text-xl leading-10 text-center font-medium">
            {slok.data.slok}
          </p>
          <VoiceButton text={slok.data.slok} label="Read Shlok" />
        </div>

        {/* Transliteration */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Transliteration
          </h2>

          <p className="whitespace-pre-line text-slate-700">
            {slok.data.transliteration}
          </p>
          <VoiceButton
            text={slok.data.transliteration}
            label="Transliteration"
          />
        </div>

        {/* Translation */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Translation
          </h2>

          <p className="text-slate-800 leading-7">
            {slok.data.commentaries?.prabhu?.et}
          </p>
        </div>

        {/* Purport */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Purport (A.C. Bhaktivedanta Swami Prabhupada)
          </h2>

          <p className="whitespace-pre-line text-slate-700 leading-8">
            {slok.data.commentaries?.prabhu?.ec}
          </p>
          <VoiceButton
            text={slok.data.commentaries?.prabhu?.ec}
            label="Commentaries"
          />
        </div>
      </section>
      <AskAIChat
        context={{
          book: "Bhagavad Gita",
          chapterNumber,
          verseNumber,
          title: slok.data.api_id,
          sanskrit: slok.data.slok,
          transliteration: slok.data.transliteration,
          translation: slok.data.commentaries?.prabhu?.et,
          purport: slok.data.commentaries?.prabhu?.ec,
        }}
      />
    </main>
  );
}
