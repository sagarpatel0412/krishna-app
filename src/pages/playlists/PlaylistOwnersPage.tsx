import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Owner = {
  id: number;
  channel_id: string;
  channel_name: string;
  channel_url: string;
  uploader_id: string;
  thumbnail:string;
};

export default function PlaylistOwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/playlists/owners`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setOwners(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOwners();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white">
      <PageContainer>
        <section className="rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Krishna Wisdom
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Devotional Channels
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-700">
            Explore lectures, kirtans, bhajans, and spiritual discussions from
            Vaishnava and ISKCON YouTube channels.
          </p>
        </section>

        {loading ? (
          <p className="mt-10 text-slate-600">Loading channels...</p>
        ) : (
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {owners.map((owner) => (
              
              <Link
                key={owner.id}
                to={`/playlists/owners/${owner.channel_id}`}
                className="
                  group
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-md
                  transition
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-3xl">
                  <img src={owner.thumbnail}/>
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-blue-700">
                  {owner.channel_name}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  {owner.uploader_id}
                </p>

                <p className="mt-5 text-sm font-semibold text-blue-600">
                  Open channel →
                </p>
              </Link>
            ))}
          </section>
        )}
      </PageContainer>
    </main>
  );
}