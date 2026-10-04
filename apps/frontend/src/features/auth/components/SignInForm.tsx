import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z.string().trim().min(1, "Password is required"),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = { email: "", password: "" }

type SignInFormProps = {
  isLoading: boolean
  errorMessage?: string | null
  onSubmit: (values: FormValues) => void | Promise<void>
}

export function SignInForm({ isLoading, errorMessage, onSubmit }: SignInFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {errorMessage ? (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
            <Input
              id="sign-in-email"
              type="email"
              placeholder="e.g. john@doe.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-in-password">Password</FieldLabel>
            <Input
              id="sign-in-password"
              type="password"
              autoComplete="current-password"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
        Sign in
      </Button>
    </form>
  )
}
