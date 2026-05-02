export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type CCPart = {
  id: number;
  lila_key: string;
  name: string;
  order_index: number;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type CCChapter = {
  id: number;
  lila_id: number;
  lila_key: string;
  chapter_number: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type CCSlok = {
  id: number;
  lila_id: number;
  chapter_id: number;
  lila_key: string;
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
