export interface Verse {
  id: number;
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ParsedQuery {
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
}

export interface VerseRange {
  start: number;
  end: number;
}

export interface BibleUpdate {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}