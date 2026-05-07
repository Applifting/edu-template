import { Loader2, RefreshCw } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

import type { Quack as QuackData } from "@/features/quack/api/quackSchemas"
import { Quack } from "@/features/quack/components/Quack"

type QuackListProps = {
  quacks: QuackData[]
  isLoading?: boolean
  error?: Error
  onReload?: () => void
}

export function QuackList({ quacks, isLoading, error, onReload }: QuackListProps) {
  return (
    <div className="flex flex-col">
      {isLoading && quacks.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : null}

      {error ? (
        <Alert
          variant="destructive"
          className="mb-4"
        >
          <AlertTitle>Couldn&apos;t load quacks</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-3">
            <span>{error.message}</span>
            {onReload ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onReload}
              >
                <RefreshCw className="size-4" />
                Reload
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}

      {quacks.map((quack) => (
        <Quack
          key={quack.id}
          quack={quack}
        />
      ))}
    </div>
  )
}
