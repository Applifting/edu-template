import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <Seo title="About" />
      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="mt-2 text-muted-foreground">About page content lands later.</p>
      </main>
    </>
  )
}
