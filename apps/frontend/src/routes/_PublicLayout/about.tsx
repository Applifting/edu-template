import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/_PublicLayout/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <Seo title="About" />
      <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">About Quacker</h1>
        <p className="text-muted-foreground">
          Our company&apos;s mission is to collaboratively manufacture access to paradigms without
          losing sight of our original goal to interactively foster advantages for quality and
          interdependent six sigma programs whilst continuing to proactively simplify
          performance-based and inexpensive leadership skills.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight">Goal</h2>
        <p className="text-muted-foreground">
          Our goal is to globally and reliably revolutionize competitive products whilst continuing
          to assertively and quickly initiate advantages for effective and world-class six sigma
          programs.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight">Vision</h2>
        <p className="text-muted-foreground">
          Our vision is to assertively foster access to professional methods of empowerment in order
          to synergistically engineer advantages for resources whilst continuing to quickly and
          globally fashion economically sound technology.
        </p>

        <p className="text-muted-foreground">
          See more at{" "}
          <a
            href="https://lotta.se/mission-statement-generator/"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Mission Statement Generator
          </a>
          .
        </p>
      </main>
    </>
  )
}
