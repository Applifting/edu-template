import { useQuery } from "@apollo/client"
import { createFileRoute } from "@tanstack/react-router"
import { RefreshCw } from "lucide-react"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { gql } from "@/gql"

import { useAuth } from "@/features/auth/hooks/useAuth"
import { QuackForm } from "@/features/quack/components/QuackForm"
import { QuackList } from "@/features/quack/components/QuackList"
import { useAddQuack } from "@/features/quack/hooks/useAddQuack"

const QuacksQuery = gql(/* GraphQL */ `
  query Quacks {
    quacks {
      id
      ...BaseQuack
    }
  }
`)

export const Route = createFileRoute("/_ProtectedPages/")({
  component: HomePage,
})

function HomePage() {
  const { user } = useAuth()
  const quacksQuery = useQuery(QuacksQuery)

  const reload = () => {
    void quacksQuery.refetch()
  }

  const addQuack = useAddQuack({ onCompleted: reload })

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
            disabled={quacksQuery.loading}
          >
            <RefreshCw className="size-4" />
            Reload
          </Button>
        </div>

        {user ? (
          <QuackForm
            {...addQuack}
            className="mb-4"
          />
        ) : null}

        <QuackList
          quacks={quacksQuery.data?.quacks ?? []}
          isLoading={quacksQuery.loading}
          error={quacksQuery.error ? new Error(quacksQuery.error.message) : undefined}
          onReload={reload}
        />
      </section>
    </>
  )
}
