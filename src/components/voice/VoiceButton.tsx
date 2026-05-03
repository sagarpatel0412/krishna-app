type VoiceButtonProps = {
  text: string;
  label?: string;
};

export default function VoiceButton({
  text,
  label = "Listen",
}: VoiceButtonProps) {
  function speak() {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={speak}
        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        🔊 {label}
      </button>

      <button
        onClick={stop}
        className="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
      >
        Stop
      </button>
    </div>
  );
}
