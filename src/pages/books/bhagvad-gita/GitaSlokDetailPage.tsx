import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGitaSlok } from "../../../services/gitaService";
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

export default function GitaSlokDetailPage() {
  const { chapterNumber, verseNumber } = useParams();

  const [slok, setSlok] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [languageCode, setLanguageCode] = useState("hi");

  const [translatedTranslation, setTranslatedTranslation] = useState("");
  const [translatedPurport, setTranslatedPurport] = useState("");

  const [translationLoading, setTranslationLoading] = useState(false);
  const [purportLoading, setPurportLoading] = useState(false);

  const [translationError, setTranslationError] = useState("");
  const [purportError, setPurportError] = useState("");

  useEffect(() => {
    if (!chapterNumber || !verseNumber) return;

    setLoading(true);

    getGitaSlok(chapterNumber, verseNumber)
      .then(setSlok)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [chapterNumber, verseNumber]);

  async function translateField(field: string) {
    if (!slok?.data?.id) return;

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/t/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        source_type: "gita_slok",
        id: slok.data.id,
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

      const text = await translateField("commentaries.prabhu.et");
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

      const text = await translateField("commentaries.prabhu.ec");
      setTranslatedPurport(text || "");
    } catch (error: any) {
      setPurportError(error.message);
    } finally {
      setPurportLoading(false);
    }
  }

  if (loading) return <p className="p-10">Loading...</p>;
  if (!slok) return <p className="p-10">No data</p>;

  const data = slok.data;
  const prabhu = data.commentaries?.prabhu;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">

      <PageContainer>
        <div className="my-6">
          <Link
            to={`/books/bhagavad-gita/chapter/${chapterNumber}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            ← Back to Chapter {chapterNumber}
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-semibold text-blue-600">Bhagavad Gita</p>

          <h1 className="mt-2 text-3xl font-bold">
            Chapter {chapterNumber}, Verse {verseNumber}
          </h1>

          <p className="mt-2 text-sm text-slate-500">{data.api_id}</p>
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

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-blue-700">
            Sanskrit
          </h2>

          <p className="whitespace-pre-line text-center text-xl font-medium leading-10">
            {data.slok}
          </p>

          <VoiceButton text={data.slok} label="Read Shlok" />
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-blue-700">
            Transliteration
          </h2>

          <p className="whitespace-pre-line text-slate-700">
            {data.transliteration}
          </p>

          <VoiceButton text={data.transliteration} label="Transliteration" />
        </div>

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

          <p className="leading-7 text-slate-800">{prabhu?.et}</p>

          {translatedTranslation && (
            <div className="mt-5 rounded-2xl bg-blue-50 p-5">
              <p className="mb-2 text-sm font-semibold text-blue-700">
                AI Translation
              </p>
              <p className="leading-7 text-slate-800">
                {translatedTranslation}
              </p>
            </div>
          )}

          {translationError && (
            <p className="mt-3 text-sm text-red-600">{translationError}</p>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-blue-700">
              Purport (A.C. Bhaktivedanta Swami Prabhupada)
            </h2>

            <button
              onClick={handleTranslatePurport}
              disabled={purportLoading}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {purportLoading ? "Translating..." : "Translate"}
            </button>
          </div>

          <p className="whitespace-pre-line leading-8 text-slate-700">
            {prabhu?.ec}
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

          <VoiceButton text={prabhu?.ec} label="Commentaries" />
        </div>
      </PageContainer>

      <AskAIChat
        context={{
          book: "Bhagavad Gita",
          chapterNumber,
          verseNumber,
          title: data.api_id,
          sanskrit: data.slok,
          transliteration: data.transliteration,
          translation: translatedTranslation || prabhu?.et,
          purport: translatedPurport || prabhu?.ec,
        }}
      />
    </main>
  );
}