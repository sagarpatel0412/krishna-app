// pages/centre-admin/TicketScannerPage.tsx

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { validateTicket } from "../../../services/eventTicketService";

export default function TicketScannerPage() {
  const [ticketCode, setTicketCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scannerStarted, setScannerStarted] = useState(false);

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannedRef = useRef(false);

  async function verifyTicket(code: string) {
    if (!code || scannedRef.current) return;

    try {
      scannedRef.current = true;
      setLoading(true);
      setError("");
      setResult(null);

      const data = await validateTicket(code.trim());

      setResult(data);
      setTicketCode("");

      setTimeout(() => {
        scannedRef.current = false;
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Ticket validation failed");

      setTimeout(() => {
        scannedRef.current = false;
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  function startScanner() {
    if (scannerStarted) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        await verifyTicket(decodedText);
      },
      () => {}
    );

    scannerRef.current = scanner;
    setScannerStarted(true);
  }

  async function stopScanner() {
    if (scannerRef.current) {
      await scannerRef.current.clear();
      scannerRef.current = null;
      setScannerStarted(false);
    }
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  async function handleManualValidate(e: React.FormEvent) {
    e.preventDefault();
    await verifyTicket(ticketCode);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Centre Admin
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            Ticket Scanner
          </h1>

          <p className="mt-4 text-slate-600">
            Scan QR code using camera or enter ticket code manually.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Camera Scanner
            </h2>

            <div className="mt-5 overflow-hidden rounded-3xl border border-orange-100 bg-orange-50 p-4">
              <div id="qr-reader" className="w-full" />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={startScanner}
                disabled={scannerStarted}
                className="flex-1 rounded-full bg-orange-600 px-5 py-3 font-bold text-white shadow hover:bg-orange-700 disabled:opacity-50"
              >
                Start Camera
              </button>

              <button
                type="button"
                onClick={stopScanner}
                disabled={!scannerStarted}
                className="flex-1 rounded-full bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>

          <form
            onSubmit={handleManualValidate}
            className="rounded-[2rem] bg-white p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Manual Code
            </h2>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Ticket Code
            </label>

            <input
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              placeholder="KW-..."
              className="mt-2 w-full rounded-2xl border border-orange-100 px-5 py-4 text-lg font-bold outline-none focus:border-orange-500"
            />

            <button
              disabled={loading || !ticketCode.trim()}
              className="mt-6 w-full rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg hover:bg-orange-700 disabled:opacity-60"
            >
              {loading ? "Validating..." : "Validate Ticket"}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-8 rounded-[2rem] bg-red-50 p-6 text-red-700 shadow">
            <h2 className="text-2xl font-black">❌ Invalid / Failed</h2>
            <p className="mt-2">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-[2rem] bg-green-50 p-6 text-green-700 shadow">
            <h2 className="text-2xl font-black">✅ Ticket Verified</h2>
            <p className="mt-2">{result.message}</p>

            {result.data && (
              <div className="mt-5 rounded-2xl bg-white p-5 text-sm text-slate-700">
                <p>
                  Ticket: <b>{result.data.ticket_code}</b>
                </p>
                <p>
                  Payment: <b>{result.data.payment_status}</b>
                </p>
                <p>
                  Check-in: <b>{result.data.checkin_status}</b>
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}