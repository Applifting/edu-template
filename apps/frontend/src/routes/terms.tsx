import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/terms")({
  component: TermsPage,
})

function TermsPage() {
  return (
    <>
      <Seo title="Terms and conditions" />
      <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Terms and conditions</h1>
        <p className="text-muted-foreground">Live long and prosper.</p>
      </main>
    </>
  )
}
