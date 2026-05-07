import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { RefreshCw } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"

import { useSession } from "@/features/auth/hooks/useSession"
import { quacksQueryOptions } from "@/features/quack/api/quacksQueryOptions"
import { QuackForm } from "@/features/quack/components/QuackForm"
import { QuackList } from "@/features/quack/components/QuackList"

export const Route = createFileRoute("/_ProtectedPages/")({
  component: HomePage,
})

function HomePage() {
  const { user } = useSession()
  const quacksQuery = useQuery(quacksQueryOptions())

  const reload = () => {
    void quacksQuery.refetch()
  }

  return (
    <>
      <Seo title="Home" />
      <section className="mx-auto w-full max-w-2xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Home</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={reload}
            disabled={quacksQuery.isFetching}
          >
            <RefreshCw className="size-4" />
            Reload
          </Button>
        </div>

        {user ? (
          <QuackForm
            onPosted={reload}
            className="mb-4"
          />
        ) : null}

        <QuackList
          quacks={quacksQuery.data ?? []}
          isLoading={quacksQuery.isLoading}
          error={quacksQuery.error ?? undefined}
          onReload={reload}
        />
      </section>
    </>
  )
}
