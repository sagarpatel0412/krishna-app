// components/footer/Footer.tsx

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type FooterGroup = {
  title: string;
  links: {
    label: string;
    to: string;
  }[];
};

export default function Footer() {
  const {
    isLoggedIn,
    isUser,
    isDevotee,
    isAdmin,
    isCenterAdmin,
    isSuperAdmin,
  } = useAuth();

  const groups: FooterGroup[] = [
    {
      title: "Explore",
      links: [
        { label: "Books", to: "/books" },
        { label: "Playlists", to: "/playlists" },
        { label: "Gallery", to: "/gallery" },
        { label: "Centres", to: "/centres" },
        { label: "About", to: "/about" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Events", to: "/events" },
        { label: "Rooms", to: "/rooms" },
        { label: "Donate", to: "/donations" },
      ],
    },
  ];

  if (isLoggedIn && isUser) {
    groups.push({
      title: "My Account",
      links: [
        { label: "Ask Guidance", to: "/ask-guidance" },
        { label: "Messages", to: "/user/my-chats" },
        { label: "My Events", to: "/user/my-events" },
        { label: "My Room Bookings", to: "/user/room-bookings" },
      ],
    });
  }

  if (isLoggedIn && isDevotee) {
    groups.push({
      title: "Devotee",
      links: [
        { label: "Devotee Chats", to: "/devotee/chats" },
        { label: "Manage Seekers", to: "/devotee/seeker-management" },
        { label: "My Events", to: "/user/my-events" },
        { label: "My Room Bookings", to: "/user/room-bookings" },
      ],
    });
  }

  if (isLoggedIn && (isCenterAdmin || isAdmin || isSuperAdmin)) {
    groups.push(
      {
        title: "Centre Admin",
        links: [
          { label: "Manage Centre", to: "/centre-admin/centre-management" },
          { label: "Manage Users", to: "/centre-admin/users" },
        ],
      },
      {
        title: "Event Admin",
        links: [
          { label: "Manage Events", to: "/centre-admin/events" },
          { label: "Create Event", to: "/centre-admin/events/create" },
          { label: "Ticket Scanner", to: "/centre-admin/ticket-scanner" },
        ],
      },
      {
        title: "Room Admin",
        links: [
          { label: "Manage Rooms", to: "/centre-admin/rooms" },
          { label: "Room Bookings", to: "/centre-admin/room-bookings" },
        ],
      }
    );
  }

  return (
    <footer className="bg-gradient-to-r from-blue-800 via-sky-700 to-blue-600 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.5fr_3fr]">
          <div>
            <h2 className="text-2xl font-extrabold">Krishna Wisdom</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-blue-100">
              Scripture, devotion, guidance, events, donations and ISKCON centre
              services in one peaceful platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="font-bold text-white">{group.title}</h3>

                <div className="mt-4 space-y-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block text-sm text-blue-100 transition hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-5 text-center text-xs text-blue-100">
          © {new Date().getFullYear()} Krishna Wisdom. All rights reserved. Developed by Sagar Patel with Blessings Of Krishna
        </div>
      </section>
    </footer>
  );
}