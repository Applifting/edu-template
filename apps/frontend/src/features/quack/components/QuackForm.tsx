import { zodResolver } from "@hookform/resolvers/zod"
import { Angry, Frown, Laugh, Loader2, Smile, type LucideIcon } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

import { quackMoods, type QuackMood } from "@/features/quack/api/quackSchemas"
import { useAddQuack } from "@/features/quack/hooks/useAddQuack"

// Mirrors the server-side DTO (MaxLength(280)) so the user is told before
// the request is made — the server still validates independently.
const MAX_LENGTH = 280

const MOOD_ICON: Record<QuackMood, LucideIcon> = {
  happy: Smile,
  sad: Frown,
  angry: Angry,
  silly: Laugh,
}

const schema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Write something first")
    .max(MAX_LENGTH, `Keep it under ${MAX_LENGTH} characters`),
  mood: z.enum(quackMoods).optional(),
})

type FormValues = z.infer<typeof schema>

type QuackFormProps = { className?: string }

export function QuackForm({ className }: QuackFormProps) {
  const addQuack = useAddQuack()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { text: "", mood: undefined },
  })

  const text = useWatch({ control: form.control, name: "text" })
  const length = text?.length ?? 0

  const handleSubmit = (values: FormValues) => {
    addQuack.mutate({ text: values.text, mood: values.mood }, { onSuccess: () => form.reset() })
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-3", className)}
      >
        {addQuack.error ? (
          <Alert variant="destructive">
            <AlertDescription>{addQuack.error.message}</AlertDescription>
          </Alert>
        ) : null}

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New quack</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Quack something..."
                  disabled={addQuack.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="mood-label">Mood (optional)</FormLabel>
              <ToggleGroup
                type="single"
                aria-labelledby="mood-label"
                value={field.value ?? ""}
                onValueChange={(value) => field.onChange(value || undefined)}
                disabled={addQuack.isPending}
                spacing={2}
                className="flex-wrap"
              >
                {quackMoods.map((mood) => {
                  const Icon = MOOD_ICON[mood]
                  return (
                    <ToggleGroupItem
                      key={mood}
                      value={mood}
                      aria-label={mood}
                    >
                      <Icon aria-hidden />
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3">
          <span
            className={cn(
              "text-sm",
              length > MAX_LENGTH ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {length}/{MAX_LENGTH}
          </span>
          <Button
            type="submit"
            size="sm"
            disabled={addQuack.isPending}
          >
            {addQuack.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Quack
          </Button>
        </div>
      </form>
    </Form>
  )
}
