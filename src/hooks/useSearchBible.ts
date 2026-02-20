import bibleDataUrl from '../assets/almeida_rc.json?url';
import { filterVerses } from "@/lib/bible/filterVerses";
import { parseQuery } from "@/lib/bible/parseQuery";
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

    const data = useMemo(() => {
        if(!bibleData) return []
        try {
            const query = parseQuery(search)
            return filterVerses({...query, content: bibleData.verses})
        } catch {
            return []
        }
    }, [bibleData, search])

    return {
        data,
        isLoading,
        error,
        isError
    }
}