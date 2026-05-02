export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type SBCanto = {
  id: number;
  canto_number: number;
  title?: string;
  name?: string;
  subtitle?: string;
  description?: string;
  summary?: string;
  chapters_count?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type SBChapter = {
  id: number;
  canto_id: number;
  canto_number: number;
  chapter_number: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type SBSlok = {
  id: number;
  canto_id: number;
  chapter_id: number;
  canto_number: number;
  chapter_number: number;
  verse_number: number;
  verse_key: string;
  verse_start: number;
  verse_end: number;
  title: string;
  devanagari: string;
  verse_text: string;
  synonyms: string;
  translation: string;
  purport: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};
