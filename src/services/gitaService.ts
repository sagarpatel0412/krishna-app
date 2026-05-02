import type { ApiResponse, GitaChapter, GitaSlok } from "../types/gita";

const API_BASE_URL = "http://localhost:3000/api";

const headers = {
  "Content-Type": "application/json",
  "x-api-key":
    "sb_91b8d7f24b1224cd3348c32c6cc0e77742aa07e5d5b8a28e670c5a3434f4c67b",

  // add these only if your backend requires auth
  // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  // "x-api-key": import.meta.env.VITE_API_KEY,
};

export async function getGitaChapters(): Promise<GitaChapter[]> {
  const res = await fetch(`${API_BASE_URL}/gita/chapters`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Gita chapters");
  }

  const json: ApiResponse<GitaChapter[]> = await res.json();

  return json.data;
}

export async function getGitaChapter(
  chapterNumber: string | number,
): Promise<GitaChapter> {
  const res = await fetch(`${API_BASE_URL}/gita/chapters/${chapterNumber}`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Gita chapter");
  }

  return res.json();
}

export async function getGitaChapterSloks(
  chapterNumber: string | number,
): Promise<GitaSlok[]> {
  const res = await fetch(
    `${API_BASE_URL}/gita/chapters/${chapterNumber}/sloks`,
    {
      headers,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Gita sloks");
  }

  const json: ApiResponse<GitaSlok[]> = await res.json();

  return json.data;
}

export async function getGitaSlok(
  chapterNumber: string | number,
  verseNumber: string | number,
): Promise<GitaSlok> {
  const res = await fetch(
    `${API_BASE_URL}/gita/chapters/${chapterNumber}/sloks/${verseNumber}`,
    { headers },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Gita slok");
  }

  return res.json();
}
