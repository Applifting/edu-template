import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { UseAddQuackReturn } from "@/features/quack/hooks/useAddQuack"

type QuackFormProps = UseAddQuackReturn & {
  maxLength?: number
  className?: string
}

export function QuackForm({
  isLoading,
  error,
  text,
  setText,
  onSubmit,
  maxLength = 250,
  className,
}: QuackFormProps) {
  const length = text.length
  const isLengthValid = length <= maxLength

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!text.trim() || !isLengthValid || isLoading) return
        onSubmit({ text })
      }}
      className={cn("rounded-lg border bg-muted/50 p-3 shadow-sm", className)}
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        name="quack"
        placeholder="Quack something..."
        disabled={isLoading}
        required
        rows={3}
        className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
      />

      <div className="mt-2 flex flex-wrap items-center justify-end gap-2">
        {error ? <p className="mr-auto text-sm text-destructive">{error.message}</p> : null}

        <span
          className={cn("text-sm", isLengthValid ? "text-muted-foreground" : "text-destructive")}
        >
          {length}/{maxLength}
        </span>

        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !isLengthValid || !text.trim()}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
          Quack
        </Button>
      </div>
    </form>
  )
}
