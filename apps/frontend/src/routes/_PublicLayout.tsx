import { createFileRoute, Outlet } from "@tanstack/react-router"

import { Header } from "@/components/Header/Header"
import { Seo } from "@/components/Seo"

import { useAuth } from "@/features/auth/hooks/useAuth"

export const Route = createFileRoute("/_PublicLayout")({
  component: PublicLayout,
})

function PublicLayout() {
  const { user, signOut } = useAuth()

  return (
    <>
      <Seo />
      <Header
        user={user}
        onSignOut={() => signOut.mutate()}
        isSigningOut={signOut.isPending}
      />
      <main className="min-h-svh">
        <Outlet />
      </main>
    </>
  )
}
