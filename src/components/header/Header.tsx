import { Link, NavLink } from "react-router-dom";
import KrishnaLogo from "../../logos/KrishnaLogo";
import useAuth from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";
import { useState } from "react";

function Header() {

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive
      ? "bg-white text-blue-700 shadow-sm"
      : "text-blue-50 hover:bg-white/15 hover:text-white"
    }`;

  const [registerOpen, setRegisterOpen] = useState(false);

  const { user, isLoggedIn, isUser, isDevotee, isAdmin, isCenterAdmin, isSuperAdmin } = useAuth();

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
          {isLoggedIn ? (
            <>
              {isUser && (
                <>
                  <NavLink to="/gallery" className={navClass}>
                    Gallery
                  </NavLink>
                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>
                  <NavLink to="/centres" className={navClass}>
                    Centres
                  </NavLink>
                  <NavLink to="/books" className={navClass}>
                    Books
                  </NavLink>
                  <NavLink to="/playlists" className={navClass}>
                    Playlists
                  </NavLink>
                  <NavLink to="/ask-guidance" className={navClass}>
                    Ask Guidance
                  </NavLink>
                  <NavLink to="/donations" className={navClass}>
                    Donate
                  </NavLink>
                  <NavLink to="/user/my-chats" className={navClass}>
                    Messages
                  </NavLink>
                   <button className="text-white" onClick={logoutUser}>Logout</button>
                </>
              )}

              {isDevotee && (
                <>
                  <NavLink to="/gallery" className={navClass}>
                    Gallery
                  </NavLink>
                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>
                  <NavLink to="/centres" className={navClass}>
                    Centres
                  </NavLink>
                  <NavLink to="/books" className={navClass}>
                    Books
                  </NavLink>
                  <NavLink to="/playlists" className={navClass}>
                    Playlists
                  </NavLink>
                  <NavLink to="/donations" className={navClass}>
                    Donate
                  </NavLink>
                  <NavLink to="/devotee/chats" className={navClass}>
                    Devotee Chats
                  </NavLink>
                  <NavLink to="/devotee/seeker-management" className={navClass}>
                    Manage Seekers
                  </NavLink>
                  <button onClick={logoutUser}>logout</button>
                </>
              )}

              {isAdmin && (
                <>
                  <NavLink to="/gallery" className={navClass}>
                    Gallery
                  </NavLink>
                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>
                  <NavLink to="/centres" className={navClass}>
                    Centres
                  </NavLink>
                  <NavLink to="/books" className={navClass}>
                    Books
                  </NavLink>
                  <NavLink to="/playlists" className={navClass}>
                    Playlists
                  </NavLink>
                  <NavLink to="/donations" className={navClass}>
                    Donate
                  </NavLink>
                   <button className="text-white" onClick={logoutUser}>Logout</button>
                </>
              )}
              {isCenterAdmin && (
                <>
                  <NavLink to="/gallery" className={navClass}>
                    Gallery
                  </NavLink>
                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>
                  <NavLink to="/centres" className={navClass}>
                    Centres
                  </NavLink>
                  <NavLink to="/books" className={navClass}>
                    Books
                  </NavLink>
                  <NavLink to="/playlists" className={navClass}>
                    Playlists
                  </NavLink>
                  <NavLink to="/donations" className={navClass}>
                    Donate
                  </NavLink>
                  <NavLink to="/centre-admin/centre-management" className={navClass}>
                    Manage Centre
                  </NavLink>
                  <NavLink to="/centre-admin/users" className={navClass}>
                    Manage Devotees
                  </NavLink>
                   <button className="text-white" onClick={logoutUser}>Logout</button>
                </>
              )}
              {isSuperAdmin && (
                <>
                  <NavLink to="/gallery" className={navClass}>
                    Gallery
                  </NavLink>
                  <NavLink to="/about" className={navClass}>
                    About
                  </NavLink>
                  <NavLink to="/centres" className={navClass}>
                    Centres
                  </NavLink>
                  <NavLink to="/books" className={navClass}>
                    Books
                  </NavLink>
                  <NavLink to="/playlists" className={navClass}>
                    Playlists
                  </NavLink>
                  <NavLink to="/donations" className={navClass}>
                    Donate
                  </NavLink>
                   <button className="text-white" onClick={logoutUser}>Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink to="/gallery" className={navClass}>
                Gallery
              </NavLink>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/about" className={navClass}>
                About
              </NavLink>
              <NavLink to="/centres" className={navClass}>
                Centres
              </NavLink>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRegisterOpen((prev) => !prev)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-blue-50 transition hover:bg-white/15 hover:text-white"
                >
                  Register ▾
                </button>

                {registerOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                    <Link
                      to="/user/register"
                      onClick={() => setRegisterOpen(false)}
                      className="block px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Register as User
                    </Link>

                    <Link
                      to="/devotee/register"
                      onClick={() => setRegisterOpen(false)}
                      className="block px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      Register as Devotee
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
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