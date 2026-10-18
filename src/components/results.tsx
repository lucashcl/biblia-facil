import { useSearchBible } from "@/hooks/useSearchBible"
import { useEffect, useRef } from "react"
import SpinnerCircle1 from "./ui/spinner"
import { Center } from "./center"
import { cn } from "../lib/utils"

type ResultsProps = {
    search: string
    className?: string
}

export function Results({ search, className }: ResultsProps) {
    const { data: results, highlight, isLoading, error, isError } = useSearchBible(search)
    const highlightedRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        highlightedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }, [highlight])

    if (isLoading) return (
        <Center className={className}>
            <SpinnerCircle1 />
        </Center>
    )
    if (isError) {
        return (
            <Center className={className}>
                <p>{JSON.stringify(error?.message)}</p>
            </Center>
        )
    }
    if (!results) return <p>Shouldn't exist</p>
    if (!results.length) return (
        <Center className={className}>
            <h3 className="text-xl font-semibold text-muted-foreground">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground/70 text-base">
                Dica: experimente pesquisar por <span className="font-mono bg-muted px-1 rounded">sl 119</span> para ver um exemplo.
            </p>
        </Center>
    )
    const title = `${results.at(0)?.book} ${results.at(0)?.chapter}`
    return (
        <div className={cn("flex-1 min-h-0 overflow-y-auto relative [scrollbar-gutter:stable_both-edges]", className)}>
            <div className="w-full max-w-2xl mx-auto">
                <h2 className="z-10 text-lg font-semibold text-center top-0 sticky bg-background py-3">{title}</h2>
                <div className="px-4 pb-6 pt-2">
                    <p className="font-bible text-lg leading-relaxed text-justify hyphens-auto">
                        {results.map(result => {
                            const isHighlighted = !!highlight && result.verse >= highlight.start && result.verse <= highlight.end
                            const isFirstHighlighted = !!highlight && result.verse === highlight.start
                            return (
                                <span
                                    key={result.verse}
                                    ref={isFirstHighlighted ? highlightedRef : undefined}
                                    className={cn(
                                        "scroll-mt-16",
                                        isHighlighted && "bg-amber-200/60 dark:bg-amber-300/20 rounded-[2px]"
                                    )}
                                >
                                    <sup
                                        className={cn(
                                            "text-[0.65em] font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-0.5 -mx-0.5 mr-0.5 select-none",
                                            isHighlighted && "text-foreground"
                                        )}
                                    >{result.verse}</sup>
                                    {result.text}{" "}
                                </span>
                            )
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}