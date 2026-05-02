export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type GitaChapter = {
  id: number;
  chapter_number: number;
  verses_count: number;
  name_sanskrit: string;
  translation: string;
  transliteration: string;
  meaning_en: string;
  meaning_hi: string;
  summary_en: string;
  summary_hi: string;
  createdAt: string;
  updatedAt: string;
};

export type GitaSlok = {
  id: number;
  chapter_id: number;
  chapter_number: number;
  verse_number: number;
  api_id: string;
  slok: string;
  transliteration: string;
  commentaries?: {
    prabhu?: {
      et?: string;
      ec?: string;
      author?: string;
    };
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
};
