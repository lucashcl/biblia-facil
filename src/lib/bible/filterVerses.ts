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
    content
  }: {
    book: string;
    chapter: number;
    content: JsonVerse[],
  }): Verse[] {
    // Retorna o capítulo inteiro. O intervalo de versículos pedido na
    // busca não filtra a exibição, apenas destaca os versículos.
    const normalizedBook = normalize(book);

    return content
      .filter(
        (v) =>
          normalize(v.book_name) === normalizedBook 
          &&
          v.chapter === chapter
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