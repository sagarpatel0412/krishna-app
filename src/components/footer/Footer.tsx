import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-200">
      <div
        className="
            mx-auto
            grid
            w-full
            max-w-[1800px]

            gap-8

            px-4
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-12

            py-10

            md:grid-cols-3
        "
        >
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Krishna Wisdom
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
            A devotional scripture reading platform for Bhagavad Gita, Srimad
            Bhagavatam, Chaitanya Charitamrita, and Prabhupada books.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/books" className="hover:text-white">
              Books
            </Link>
            <Link to="/gallery" className="hover:text-white">
              Gallery
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Note</h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Translations and AI explanations are for learning support. Original
            scripture content should be treated as the primary source.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Krishna Wisdom. Built with devotion. Developed by Sagar Patel with blessings of Krishna.
      </div>
    </footer>
  );
}

export default Footer;