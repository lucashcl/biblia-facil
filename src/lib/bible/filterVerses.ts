import type { Verse } from "../types";
import { normalize } from "../utils";

type JsonVerse = {
  book_name: string
  chapter: number
  verse: number
  text: string
}

export function filterVerses({
    book,
    chapter,
    startVerse,
    endVerse,
    content
  }: {
    book: string;
    chapter: number;
    content: JsonVerse[],
    startVerse?: number;
    endVerse?: number;
  }): Verse[] {
    // Helper to normalize and lowercase strings (remove accents)

    const normalizedBook = normalize(book);

    return content
      .filter(
        (v) =>
          normalize(v.book_name) === normalizedBook 
          &&
          v.chapter === chapter 
          &&
          (startVerse ? v.verse >= startVerse : true)
          &&
          (endVerse ? v.verse <= endVerse : startVerse ? v.verse <= startVerse : true)
      )
      .map(
        (v): Verse => ({
          id: 1000 * v.chapter + v.verse,
          book: v.book_name,
          chapter: v.chapter,
          verse: v.verse,
          text: v.text,
        })
    );
}