import { useEffect, useRef, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";

type GalleryImage = {
  file_id: string;
  id: number;
  imageViewLink?: string;
  mime_type: string;
  image_url?: string;
  thumbnail_link?: string;
  title: string;
  web_content_link?: string;
  web_view_link?: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  async function fetchImages(currentPage: number) {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `http://localhost:3000/api/gallery?page=${currentPage}&limit=30`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const json = await response.json();

      if (json.success) {
        setImages((prev) => {
          const existingIds = new Set(prev.map((image) => image.id));

          const newImages = (json.data || []).filter(
            (image: GalleryImage) => !existingIds.has(image.id)
          );

          return [...prev, ...newImages];
        });

        setHasMore(Boolean(json.hasMore));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  useEffect(() => {
    if (!observerRef.current || !hasMore || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadingMore, loading]);

  function getGridImageUrl(image: GalleryImage) {
    return image.thumbnail_link || image.image_url || image.imageViewLink || "";
  }

  function getModalImageUrl(image: GalleryImage) {
    return image.imageViewLink || image.image_url || image.thumbnail_link || "";
  }

  function getOpenImageUrl(image: GalleryImage) {
    return (
      image.imageViewLink ||
      image.web_view_link ||
      image.image_url ||
      image.thumbnail_link ||
      "#"
    );
  }

  function getDownloadUrl(image: GalleryImage) {
    return (
      image.web_content_link ||
      image.imageViewLink ||
      image.image_url ||
      image.thumbnail_link ||
      "#"
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <PageContainer>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Krishna Art Gallery
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Divine Krishna Images
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Explore beautiful Krishna paintings and devotional images. Click any
            image to preview and download.
          </p>
        </div>

        {loading ? (
          <p className="mt-12 text-center text-slate-600">Loading gallery...</p>
        ) : (
          <>
            <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group mb-5 w-full break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden bg-slate-100">
                    <img
                      loading="lazy"
                      src={getGridImageUrl(image)}
                      alt={image.title}
                      className="w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                    <div className="absolute bottom-4 left-4 right-4 text-left text-white opacity-0 transition group-hover:opacity-100">
                      <p className="text-sm font-semibold">{image.title}</p>
                      <p className="mt-1 text-xs text-blue-100">
                        Click to preview
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div ref={observerRef} className="h-20" />

            {loadingMore && (
              <div className="pb-10 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              </div>
            )}

            {!hasMore && images.length > 0 && (
              <p className="pb-10 text-center text-sm text-slate-500">
                You have reached the end of the gallery.
              </p>
            )}
          </>
        )}
      </PageContainer>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-800 shadow hover:bg-white"
            >
              ✕
            </button>

            <div className="grid max-h-[92vh] md:grid-cols-[1fr_320px]">
              <div className="flex items-center justify-center bg-slate-950">
                <img
                  src={getModalImageUrl(selectedImage)}
                  alt={selectedImage.title}
                  className="max-h-[92vh] w-full object-contain"
                />
              </div>

              <aside className="overflow-y-auto p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  Preview
                </p>

                <h2 className="mt-2 break-all text-2xl font-bold text-slate-900">
                  {selectedImage.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Open or download this Krishna image for your local use.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={getOpenImageUrl(selectedImage)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-blue-300 bg-white px-6 py-3 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Open Full Image
                  </a>

                  <a
                    href={getDownloadUrl(selectedImage)}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
                  >
                    Download Image
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}