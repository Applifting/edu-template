import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_ProtectedPages/practical-01")({
  component: Practical01Page,
})

function Practical01Page() {
  return (
    <>
      <Seo title="Practical 01" />
      <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Practical 01</h1>
        <p className="text-muted-foreground">Hello!</p>
        <Button onClick={() => alert("Button Pressed!")}>Press Me</Button>
      </main>
    </>
  )
}
