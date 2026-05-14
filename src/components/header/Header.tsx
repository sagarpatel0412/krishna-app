import { Link, NavLink } from "react-router-dom";
import KrishnaLogo from "../../logos/KrishnaLogo";

function Header() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white text-blue-700 shadow-sm"
        : "text-blue-50 hover:bg-white/15 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 via-sky-600 to-blue-500 shadow-lg">
      <nav
        className="
          mx-auto
          flex
          h-20
          w-full
          max-w-[1800px]
          items-center
          justify-between

          px-4
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
        "
      >
        <Link to="/" className="flex items-center gap-3">
          {/* <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl font-black text-blue-700 shadow-md">
            
          </div> */}
          <KrishnaLogo size={48} className="shadow-xl" />

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
              Krishna Wisdom
            </h1>
            <p className="hidden text-xs text-blue-100 sm:block">
              Scripture • Devotion • Knowledge
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/books" className={navClass}>
            Books
          </NavLink>
          <NavLink to="/playlists" className={navClass}>
            Playlists
          </NavLink>
          <NavLink to="/gallery" className={navClass}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/centres" className={navClass}>
            Centres
          </NavLink>
          <NavLink to="/ask-guidance" className={navClass}>
            Ask Guidance
          </NavLink>
          <NavLink to="/user/my-chats" className={navClass}>
            Messages
          </NavLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/books"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm"
          >
            Books
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;