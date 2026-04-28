import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import "@/styles/global.css"

import { Toaster } from "@/components/ui/sonner"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster
        richColors
        position="top-right"
      />
      {/* eslint-disable-next-line turbo/no-undeclared-env-vars */}
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-right" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}
