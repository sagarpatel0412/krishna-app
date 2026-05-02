import type { ApiResponse, SBCanto, SBChapter, SBSlok } from "../types/sb";

const API_BASE_URL = "http://localhost:3000/api";

const headers = {
  "Content-Type": "application/json",
  "x-api-key":
    "sb_91b8d7f24b1224cd3348c32c6cc0e77742aa07e5d5b8a28e670c5a3434f4c67b",

  // add these only if your backend requires auth
  // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  // "x-api-key": import.meta.env.VITE_API_KEY,
};

export async function getSBCantos(): Promise<SBCanto[]> {
  const res = await fetch(`${API_BASE_URL}/sb/cantos`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Srimad Bhagavatam cantos");
  }

  const json: ApiResponse<SBCanto[]> = await res.json();

  return json.data;
}

export async function getSBCanto(
  cantoNumber: string | number,
): Promise<SBCanto> {
  const res = await fetch(`${API_BASE_URL}/sb/cantos/${cantoNumber}`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch canto");
  }

  const json: ApiResponse<SBCanto> = await res.json();

  return json.data;
}

export async function getSBChapters(
  cantoNumber: string | number,
): Promise<SBChapter[]> {
  const res = await fetch(`${API_BASE_URL}/sb/cantos/${cantoNumber}/chapters`, {
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Bhagavatam chapters");
  }

  const json: ApiResponse<SBChapter[]> = await res.json();

  return json.data;
}

export async function getSBChapter(
  cantoNumber: string | number,
  chapterNumber: string | number,
): Promise<SBChapter> {
  const res = await fetch(
    `${API_BASE_URL}/sb/cantos/${cantoNumber}/chapters/${chapterNumber}`,
    {
      headers,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Bhagavatam chapter");
  }

  const json: ApiResponse<SBChapter> = await res.json();

  return json.data;
}

export async function getSBChapterSloks(
  cantoNumber: string | number,
  chapterNumber: string | number,
): Promise<SBSlok[]> {
  const res = await fetch(
    `${API_BASE_URL}/sb/cantos/${cantoNumber}/chapters/${chapterNumber}/sloks`,
    {
      headers,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Bhagavatam sloks");
  }

  const json: ApiResponse<SBSlok[]> = await res.json();

  return json.data;
}

export async function getSBSlok(
  cantoNumber: string | number,
  chapterNumber: string | number,
  verseKey: string,
): Promise<SBSlok> {
  const res = await fetch(
    `${API_BASE_URL}/sb/cantos/${cantoNumber}/chapters/${chapterNumber}/sloks/${verseKey}`,
    {
      headers,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Bhagavatam slok");
  }

  const json: ApiResponse<SBSlok> = await res.json();

  return json.data;
}
