import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useSignOut } from "@/features/auth/hooks/useSignOut"

export function LogoutButton() {
  const signOut = useSignOut()

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
