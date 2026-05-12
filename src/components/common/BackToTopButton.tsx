import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="
        fixed
        bottom-28
        right-5
        z-40

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        bg-gradient-to-r
        from-blue-700
        to-sky-500

        text-white
        shadow-xl

        transition
        hover:scale-105
        hover:shadow-2xl

        active:scale-95
      "
    >
      <span className="text-2xl font-bold">↑</span>
    </button>
  );
}