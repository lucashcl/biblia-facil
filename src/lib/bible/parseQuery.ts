import type { ParsedQuery } from "../types";
import { bibleBooks } from "./bibleBooks";

export function parseQuery(query: string): ParsedQuery {
    try {
        const [book, chapter, verses] = query.split(" ");
        // const [book, chapter] = bookChapter.trim().split(/\s+/);
        const [startVerse, endVerse] = (verses || '-').split('-').map(v => (v ? Number.parseInt(v) : undefined));

        if (!book || Number.isNaN(Number.parseInt(chapter))) {
          throw new Error('Formato inválido');
        }

        return {
          book: bibleBooks[book.toLowerCase()] ?? book,
          chapter: Number.parseInt(chapter),
          startVerse: startVerse,
          endVerse: endVerse,
        };
    } catch {
        throw new Error('Formato inválido. Use: [Livro] [capítulo]:[versículo?]-[versículo?]');
    } 
}