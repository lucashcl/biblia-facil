import { cn } from "../lib/utils"

type CenterProps = {
    children: React.ReactNode
    className?: string
}

export function Center({ children, className }: CenterProps) {
    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center p-4", className)}>
            {children}
        </div>
    )
}