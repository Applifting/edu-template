import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/terms")({
  component: TermsPage,
})

function TermsPage() {
  return (
    <>
      <Seo title="Terms" />
      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Terms and conditions</h1>
        <p className="mt-2 text-muted-foreground">Terms page content lands later.</p>
      </main>
    </>
  )
}
