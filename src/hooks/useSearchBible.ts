import bibleDataUrl from '../assets/almeida_rc.json?url';
import { filterVerses } from "@/lib/bible/filterVerses";
import { parseQuery } from "@/lib/bible/parseQuery";
import type { VerseRange } from "@/lib/types";
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

async function loadBibleData() {
    const response = await fetch(bibleDataUrl);
    const bibleData = await response.json();
    return bibleData;
}

export function useSearchBible(search: string) {
    const { data: bibleData, isLoading, error, isError } = useQuery({
        queryKey: ['bible-data'],
        queryFn: loadBibleData,
        staleTime: Infinity
    })

    const parsed = useMemo(() => {
        try {
            return parseQuery(search)
        } catch {
            return null
        }
    }, [search])

    // Exibe o capítulo inteiro; o intervalo pedido só define o destaque.
    const data = useMemo(() => {
        if(!bibleData || !parsed) return []
        return filterVerses({
            book: parsed.book,
            chapter: parsed.chapter,
            content: bibleData.verses
        })
    }, [bibleData, parsed])

    const highlight = useMemo<VerseRange | null>(() => {
        if(!parsed?.startVerse) return null
        return {
            start: parsed.startVerse,
            end: parsed.endVerse ?? parsed.startVerse
        }
    }, [parsed])

    return {
        data,
        highlight,
        isLoading,
        error,
        isError
    }
}