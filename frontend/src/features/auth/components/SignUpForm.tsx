import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ROUTES } from "@/app/routes"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z
  .object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
    name: z.string().trim().min(1, "Name is required"),
    username: z.string().trim().min(1, "Username is required"),
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().trim().min(1, "Password confirmation is required"),
    profileImage: z.instanceof(File).nullable(),
    terms: z.literal(true, { message: "You must accept the terms and conditions" }),
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
  profileImage: null,
  terms: false as unknown as true,
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
    <Form {...form}>
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g. john@doe.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field: { onChange, value: _value, ref, ...rest } }) => (
            <FormItem>
              <FormLabel>Profile image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={ref}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null
                    onChange(file)
                  }}
                  {...rest}
                />
              </FormControl>
              <FormDescription>Optional. PNG or JPEG.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field: { value: isAccepted, onChange } }) => (
            <FormItem className="flex flex-row items-start gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={Boolean(isAccepted)}
                  onCheckedChange={(isChecked) => onChange(isChecked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree with the{" "}
                  <Link
                    to={ROUTES.terms}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    terms and conditions
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
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
    </Form>
  )
}
