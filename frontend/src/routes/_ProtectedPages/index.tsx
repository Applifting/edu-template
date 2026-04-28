import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/_ProtectedPages/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Seo title="Home" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="mt-2 text-muted-foreground">
          The quack feed will live here once the feature commit lands.
        </p>
      </div>
    </>
  )
}
