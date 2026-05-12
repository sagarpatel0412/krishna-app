import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCCSlok } from "../../../services/ccService";
import type { CCSlok } from "../../../types/cc";
import AskAIChat from "../../../components/ai-chat/AskAIChat";
import VoiceButton from "../../../components/voice/VoiceButton";
import PageContainer from "../../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LANGUAGE_OPTIONS = [
  { code: "hi", label: "Hindi" },
  { code: "gu", label: "Gujarati" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
];

export default function CCSlokDetailPage() {
  const { lilaKey, chapterNumber, verseKey } = useParams();

  const [slok, setSlok] = useState<CCSlok | null>(null);
  const [loading, setLoading] = useState(true);

  const [languageCode, setLanguageCode] = useState("hi");

  const [translatedTranslation, setTranslatedTranslation] = useState("");
  const [translatedPurport, setTranslatedPurport] = useState("");

  const [translationLoading, setTranslationLoading] = useState(false);
  const [purportLoading, setPurportLoading] = useState(false);

  const [translationError, setTranslationError] = useState("");
  const [purportError, setPurportError] = useState("");

  useEffect(() => {
    if (!lilaKey || !chapterNumber || !verseKey) return;

    setLoading(true);

    getCCSlok(lilaKey, chapterNumber, verseKey)
      .then(setSlok)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lilaKey, chapterNumber, verseKey]);

  async function translateField(field: string) {
    if (!slok?.id) return "";

    const response = await fetch(`${API_BASE_URL}/t/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        source_type: "cc_slok",
        id: slok.id,
        field,
        language_code: languageCode,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Translation failed");
    }

    return result.translated_text;
  }

  async function handleTranslateTranslation() {
    try {
      setTranslationLoading(true);
      setTranslationError("");

      const text = await translateField("translation");
      setTranslatedTranslation(text || "");
    } catch (error: any) {
      setTranslationError(error.message);
    } finally {
      setTranslationLoading(false);
    }
  }

  async function handleTranslatePurport() {
    try {
      setPurportLoading(true);
      setPurportError("");

      const text = await translateField("purport");
      setTranslatedPurport(text || "");
    } catch (error: any) {
      setPurportError(error.message);
    } finally {
      setPurportLoading(false);
    }
  }

  if (loading) {
    return <p className="p-10 text-slate-600">Loading verse...</p>;
  }

  if (!slok) {
    return <p className="p-10 text-slate-600">Verse not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>

        <div className="mx-4">
          <Link
            to={`/books/chaitanya-charitamrita/${lilaKey}/chapter/${chapterNumber}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Chapter {chapterNumber}
          </Link>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Chaitanya Charitamrita
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {slok.title}
          </h1>

          <p className="mt-2 text-sm capitalize text-slate-500">
            {slok.lila_key}-līlā, Chapter {slok.chapter_number}, Verse{" "}
            {slok.verse_key}
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-md">
          <label className="text-sm font-semibold text-slate-700">
            Translate to
          </label>

          <select
            value={languageCode}
            onChange={(e) => {
              setLanguageCode(e.target.value);
              setTranslatedTranslation("");
              setTranslatedPurport("");
              setTranslationError("");
              setPurportError("");
            }}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            {LANGUAGE_OPTIONS.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {slok.devanagari && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-blue-700">
              Devanagari
            </h2>

            <p className="text-center text-xl font-medium leading-10 text-slate-800">
              {slok.devanagari}
            </p>
          </div>
        )}

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-blue-700">
            Verse Text
          </h2>

          <p className="leading-8 text-slate-700">{slok.verse_text}</p>

          <VoiceButton text={slok.verse_text} label="Verse" />
        </div>

        {slok.synonyms && (
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-lg font-semibold text-blue-700">
              Synonyms
            </h2>

            <p className="leading-8 text-slate-700">{slok.synonyms}</p>
          </div>
        )}

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-blue-700">
              Translation
            </h2>

            <button
              onClick={handleTranslateTranslation}
              disabled={translationLoading}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {translationLoading ? "Translating..." : "Translate"}
            </button>
          </div>

          <p className="leading-8 text-slate-800">{slok.translation}</p>

          {translatedTranslation && (
            <div className="mt-5 rounded-2xl bg-blue-50 p-5">
              <p className="mb-2 text-sm font-semibold text-blue-700">
                AI Translation
              </p>

              <p className="leading-8 text-slate-800">
                {translatedTranslation}
              </p>
            </div>
          )}

          {translationError && (
            <p className="mt-3 text-sm text-red-600">{translationError}</p>
          )}

          <VoiceButton
            text={translatedTranslation || slok.translation}
            label="Translation"
          />
        </div>

        {slok.purport && (
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-blue-700">Purport</h2>

              <button
                onClick={handleTranslatePurport}
                disabled={purportLoading}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {purportLoading ? "Translating..." : "Translate"}
              </button>
            </div>

            <p className="whitespace-pre-line leading-8 text-slate-700">
              {slok.purport}
            </p>

            {translatedPurport && (
              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="mb-2 text-sm font-semibold text-blue-700">
                  AI Translation
                </p>

                <p className="whitespace-pre-line leading-8 text-slate-800">
                  {translatedPurport}
                </p>
              </div>
            )}

            {purportError && (
              <p className="mt-3 text-sm text-red-600">{purportError}</p>
            )}

            <VoiceButton
              text={translatedPurport || slok.purport}
              label="Purport"
            />
          </div>
        )}
      </PageContainer>

      <AskAIChat
        context={{
          book: "Chaitanya Charitamrita",
          lilaKey,
          chapterNumber,
          verseKey,
          title: slok.title,
          devanagari: slok.devanagari,
          verse_text: slok.verse_text,
          synonyms: slok.synonyms,
          translation: translatedTranslation || slok.translation,
          purport: translatedPurport || slok.purport,
        }}
      />
    </main>
  );
}