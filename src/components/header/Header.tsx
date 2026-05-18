import { Link, NavLink } from "react-router-dom";
import KrishnaLogo from "../../logos/KrishnaLogo";
import useAuth from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";
import { useState } from "react";

type MenuItem = {
  label: string;
  to?: string;
  children?: MenuItem[];
};

function Header() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const {
    isLoggedIn,
    isUser,
    isDevotee,
    isAdmin,
    isCenterAdmin,
    isSuperAdmin,
  } = useAuth();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
      isActive
        ? "bg-white text-blue-700 shadow-sm"
        : "text-blue-50 hover:bg-white/15 hover:text-white"
    }`;

  const dropdownLink =
    "block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700";

  const commonMore: MenuItem[] = [
    {
      label: "Library",
      children: [
        { label: "Books", to: "/books" },
        { label: "Playlists", to: "/playlists" },
        { label: "Gallery", to: "/gallery" },
      ],
    },
    {
      label: "Rooms",
      children: [
        { label: "Find Rooms", to: "/rooms" },
        { label: "My Room Bookings", to: "/user/room-bookings" },
      ],
    },
    {
      label: "Events",
      children: [
        { label: "All Events", to: "/events" },
        { label: "My Registered Events", to: "/user/my-events" },
      ],
    },
    {
      label: "General",
      children: [
        { label: "Centres", to: "/centres" },
        { label: "About", to: "/about" },
        { label: "Donate", to: "/donations" },
      ],
    },
  ];

  const userMore: MenuItem[] = [
    {
      label: "Guidance",
      children: [
        { label: "Ask Guidance", to: "/ask-guidance" },
        { label: "Messages", to: "/user/my-chats" },
      ],
    },
  ];

  const devoteeMore: MenuItem[] = [
    {
      label: "Devotee",
      children: [
        { label: "Devotee Chats", to: "/devotee/chats" },
        { label: "Manage Seekers", to: "/devotee/seeker-management" },
      ],
    },
  ];

  const centreAdminMore: MenuItem[] = [
    {
      label: "Centre Admin",
      children: [
        { label: "Manage Centre", to: "/centre-admin/centre-management" },
        { label: "Manage Users", to: "/centre-admin/users" },
      ],
    },
    {
      label: "Event Management",
      children: [
        { label: "Manage Events", to: "/centre-admin/events" },
        { label: "Create Event", to: "/centre-admin/events/create" },
        { label: "Ticket Scanner", to: "/centre-admin/ticket-scanner" },
      ],
    },
    {
      label: "Room Management",
      children: [
        { label: "Manage Rooms", to: "/centre-admin/rooms" },
        { label: "Room Bookings", to: "/centre-admin/room-bookings" },
      ],
    },
  ];

  let moreItems: MenuItem[] = [...commonMore];

  if (isUser) moreItems = [...moreItems, ...userMore];
  if (isDevotee) moreItems = [...moreItems, ...devoteeMore];
  if (isCenterAdmin) moreItems = [...moreItems, ...centreAdminMore];
  if (isAdmin || isSuperAdmin) moreItems = [...moreItems, ...centreAdminMore];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 via-sky-600 to-blue-500 shadow-lg">
      <nav className="mx-auto flex h-20 w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 sm:my-8 lg:my-8 xl:my-8">
        <Link to="/" className="flex items-center gap-3">
          <KrishnaLogo size={38} className="shadow-xl" />

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-white md:text-xl">
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

          <NavLink to="/events" className={navClass}>
            Events
          </NavLink>

          <NavLink to="/rooms" className={navClass}>
            Rooms
          </NavLink>

          <NavLink to="/donations" className={navClass}>
            Donate
          </NavLink>
          <NavLink to="/festival-calendar" className={navClass}>
            Calendar
          </NavLink>

          {isLoggedIn && isUser && (
            <NavLink to="/ask-guidance" className={navClass}>
              Ask Guidance
            </NavLink>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              className="rounded-full px-3 py-1.5 text-[13px] font-semibold text-blue-50 transition hover:bg-white/15 hover:text-white"
            >
              More ▾
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                {moreItems.map((group) => (
                  <div key={group.label} className="border-b border-slate-100 last:border-b-0">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup(openGroup === group.label ? null : group.label)
                      }
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-slate-800 hover:bg-slate-50"
                    >
                      {group.label}
                      <span>{openGroup === group.label ? "−" : "+"}</span>
                    </button>

                    {openGroup === group.label && (
                      <div className="bg-slate-50/70 py-1">
                        {group.children?.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to || "#"}
                            onClick={() => {
                              setMoreOpen(false);
                              setOpenGroup(null);
                            }}
                            className={dropdownLink}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRegisterOpen((prev) => !prev)}
                  className="rounded-full px-3 py-1.5 text-[13px] font-semibold text-blue-50 transition hover:bg-white/15 hover:text-white"
                >
                  Register ▾
                </button>

                {registerOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                    <Link
                      to="/user/register"
                      onClick={() => setRegisterOpen(false)}
                      className={dropdownLink}
                    >
                      Register as User
                    </Link>

                    <Link
                      to="/devotee/register"
                      onClick={() => setRegisterOpen(false)}
                      className={dropdownLink}
                    >
                      Register as Devotee
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              className="rounded-full bg-white px-4 py-1.5 text-[13px] font-bold text-blue-700 shadow-sm"
              onClick={logoutUser}
            >
              Logout
            </button>
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