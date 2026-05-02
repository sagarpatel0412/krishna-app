import type { ApiResponse, CCChapter, CCPart, CCSlok } from "../types/cc";

const API_BASE_URL = "http://localhost:3000/api";

const headers = {
  "Content-Type": "application/json",
  "x-api-key":
    "sb_91b8d7f24b1224cd3348c32c6cc0e77742aa07e5d5b8a28e670c5a3434f4c67b",

  // add these only if your backend requires auth
  // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  // "x-api-key": import.meta.env.VITE_API_KEY,
};

export async function getCCParts(): Promise<CCPart[]> {
  const res = await fetch(`${API_BASE_URL}/cc/parts`, {
    headers,
  });

  if (!res.ok) throw new Error("Failed to fetch CC parts");

  const json: ApiResponse<CCPart[]> = await res.json();
  return json.data;
}

export async function getCCPart(lilaKey: string): Promise<CCPart> {
  const res = await fetch(`${API_BASE_URL}/cc/parts/${lilaKey}`, {
    headers,
  });

  if (!res.ok) throw new Error("Failed to fetch CC part");

  const json: ApiResponse<CCPart> = await res.json();
  return json.data;
}

export async function getCCChapters(lilaKey: string): Promise<CCChapter[]> {
  const res = await fetch(`${API_BASE_URL}/cc/parts/${lilaKey}/chapters`, {
    headers,
  });

  if (!res.ok) throw new Error("Failed to fetch CC chapters");

  const json: ApiResponse<CCChapter[]> = await res.json();
  return json.data;
}

export async function getCCChapter(
  lilaKey: string,
  chapterNumber: string | number,
): Promise<CCChapter> {
  const res = await fetch(
    `${API_BASE_URL}/cc/parts/${lilaKey}/chapters/${chapterNumber}`,
    {
      headers,
    },
  );

  if (!res.ok) throw new Error("Failed to fetch CC chapter");

  const json: ApiResponse<CCChapter> = await res.json();
  return json.data;
}

export async function getCCChapterSloks(
  lilaKey: string,
  chapterNumber: string | number,
): Promise<CCSlok[]> {
  const res = await fetch(
    `${API_BASE_URL}/cc/parts/${lilaKey}/chapters/${chapterNumber}/sloks`,
    {
      headers,
    },
  );

  if (!res.ok) throw new Error("Failed to fetch CC sloks");

  const json: ApiResponse<CCSlok[]> = await res.json();
  return json.data;
}

export async function getCCSlok(
  lilaKey: string,
  chapterNumber: string | number,
  verseKey: string,
): Promise<CCSlok> {
  const res = await fetch(
    `${API_BASE_URL}/cc/parts/${lilaKey}/chapters/${chapterNumber}/sloks/${verseKey}`,
    {
      headers,
    },
  );

  if (!res.ok) throw new Error("Failed to fetch CC slok");

  const json: ApiResponse<CCSlok> = await res.json();
  return json.data;
}
