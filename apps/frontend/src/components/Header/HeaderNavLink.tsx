import type { ReactNode } from "react"
import { Link, type LinkProps } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

type HeaderNavLinkProps = LinkProps & {
  children: ReactNode
  className?: string
}

export function HeaderNavLink({ children, className, ...props }: HeaderNavLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      activeProps={{
        className: "rounded-md px-2 py-1 text-sm font-medium text-foreground",
      }}
    >
      {children}
    </Link>
  )
}
