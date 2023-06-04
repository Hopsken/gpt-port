import { z } from 'zod'

export type FormField<T extends z.ZodSchema = z.ZodSchema> = {
  required: boolean
  schema: T
  key: string
  label: string
  description?: string
  defaultValue: z.infer<T>
}
