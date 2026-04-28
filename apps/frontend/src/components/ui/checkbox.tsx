import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, onCheckedChange, onChange, ...props }, ref) => (
  <span className="relative inline-flex items-center justify-center">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-primary shadow checked:bg-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={(e) => {
        onCheckedChange?.(e.target.checked)
        onChange?.(e)
      }}
      {...props}
    />
    <Check className="pointer-events-none absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
  </span>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
