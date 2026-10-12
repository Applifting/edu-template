import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const schema = z
  .object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
    name: z.string().trim().min(1, "Name is required"),
    username: z.string().trim().min(1, "Username is required"),
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().trim().min(1, "Password confirmation is required"),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  })

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  email: "",
  name: "",
  username: "",
  password: "",
  passwordConfirmation: "",
}

type SignUpFormProps = {
  isLoading: boolean
  errorMessage?: string | null
  onSubmit: (values: FormValues) => void | Promise<void>
}

export function SignUpForm({ isLoading, errorMessage, onSubmit }: SignUpFormProps) {
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
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-up-name">Name</FieldLabel>
            <Input
              id="sign-up-name"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-up-username">Username</FieldLabel>
            <Input
              id="sign-up-username"
              autoComplete="username"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
            <Input
              id="sign-up-email"
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
            <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
            <Input
              id="sign-up-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="passwordConfirmation"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sign-up-passwordConfirmation">Confirm password</FieldLabel>
            <Input
              id="sign-up-passwordConfirmation"
              type="password"
              autoComplete="new-password"
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
        Sign up
      </Button>
    </form>
  )
}
