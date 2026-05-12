import peacock from "../assets/peacock.jpg";

type Props = {
  size?: number;
  className?: string;
};

export default function KrishnaLogo({
  size = 48,
  className = "",
}: Props) {
  return (
    <div
      className={`
        flex
        items-center
        justify-center

        overflow-hidden

        rounded-2xl
        bg-white
        shadow-lg

        ring-1
        ring-white/20

        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={peacock}
        alt="Peacock Feather"
        className="
          h-full
          w-full
          object-cover
          scale-110
        "
      />
    </div>
  );
}