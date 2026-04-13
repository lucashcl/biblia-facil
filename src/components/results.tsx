import { useSearchBible } from "@/hooks/useSearchBible"
import SpinnerCircle1 from "./ui/spinner"
import { Center } from "./center"
import { cn } from "../lib/utils"

type ResultsProps = {
    search: string
    className?: string
}

export function Results({ search, className }: ResultsProps) {
    const { data: results, isLoading, error, isError } = useSearchBible(search)
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
        <div className={cn("flex-1 h-full overflow-y-auto relative", className)}>
            <h2 className="t
                
            ext<div></div>
             font-semibold top-0 sticky bg-background p-4">{title}</h2>
            <div className="px-4 pb-4">
                {results.map(result => (
                    <div className="flex gap-1 items-top mb-1">
                        <span className="text-xs text-muted-foreground truncate">{result.verse} </span>
                        <p className="leading-tight">{result.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}