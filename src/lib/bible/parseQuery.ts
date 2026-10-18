import type { ParsedQuery } from "../types";
import { bibleBooks } from "./bibleBooks";

export function parseQuery(query: string): ParsedQuery {
    try {
        // Normaliza "ef 3 1 - 5" para "ef 3 1-5", depois separa o livro das
        // partes numéricas. Aceita tanto "ef 3 1-5" quanto "ef 3 1 5".
        const [book, chapter, ...verseTokens] = query
            .trim()
            .replace(/\s*-\s*/g, "-")
            .split(/\s+/);
        const [startVerse, endVerse] = verseTokens
            .join("-")
            .split("-")
            .map(v => {
                const verse = Number.parseInt(v);
                return Number.isNaN(verse) ? undefined : verse;
            });

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
        throw new Error('Formato inválido. Use: [Livro] [capítulo] [versículo] ou [Livro] [capítulo] [versículo]-[versículo]');
    } 
}