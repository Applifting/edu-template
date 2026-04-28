import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useAuth } from "@/features/auth/hooks/useAuth"

export function LogoutButton() {
  const { signOut } = useAuth()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut.mutate()}
      disabled={signOut.isPending}
    >
      <LogOut className="size-4" />
      Sign out
    </Button>
  )
}
