import { useState } from "react";

type AskAIChatProps = {
  context: any;
};

export default function AskAIChat({ context }: AskAIChatProps) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:3000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          question,
          context,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "AI failed");
      }

      setAnswer(json.data.answer);
    } catch (err: any) {
      setAnswer(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-blue-600 px-6 py-4 font-semibold text-white shadow-2xl transition hover:bg-blue-700"
      >
        Ask AI ✨
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 p-4 md:p-8">
          <div className="h-[620px] w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-5 text-white">
              <div>
                <p className="text-sm text-blue-100">Krishna Wisdom AI</p>
                <h3 className="text-xl font-bold">Ask about this shlok</h3>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/20 px-3 py-1 text-lg hover:bg-white/30"
              >
                ×
              </button>
            </div>

            <div className="flex h-[calc(620px-84px)] flex-col">
              <div className="flex-1 overflow-y-auto p-5">
                <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-slate-700">
                  Ask anything about this current {context.book} verse.
                </div>

                {question && (
                  <div className="mt-4 rounded-2xl bg-blue-600 p-4 text-sm leading-6 text-white">
                    {question}
                  </div>
                )}

                {loading && (
                  <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                    Thinking...
                  </div>
                )}

                {answer && (
                  <div className="mt-4 whitespace-pre-line rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-800">
                    {answer}
                  </div>
                )}
              </div>

              <form onSubmit={handleAsk} className="border-t p-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask: Explain this shlok simply..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                />

                <button
                  disabled={loading}
                  className="mt-3 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Asking..." : "Ask"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
