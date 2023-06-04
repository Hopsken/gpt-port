import { FormField } from './type'
import { useForm } from '@mantine/form'
import { useMemo } from 'react'
import {
  Button,
  Checkbox,
  Group,
  NativeSelect,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { ZodBoolean, ZodEnum, ZodNumber, ZodString } from 'zod'

export function GenericForm<T extends FormField[]>(props: {
  fields: T
  onSubmit: (data: object) => void
  onCancel?: () => void
}) {
  const initialValues = useMemo(() => {
    return props.fields.reduce((acc, cur) => {
      acc[cur['key']] = cur['defaultValue']
      return acc
    }, {} as Record<string, unknown>)
  }, [props.fields])

  const validate = useMemo(() => {
    return props.fields.reduce((acc, cur) => {
      acc[cur['key']] = (value: unknown) => {
        if (cur.required && value == null) return 'Required'
        const parsed = cur.schema.safeParse(value)
        if (parsed.success) return null
        return parsed.error.errors[0]?.message
      }
      return acc
    }, {} as Record<string, Function>)
  }, [props.fields])

  const form = useForm({
    initialValues,
    validate,
  })

  function renderField(field: FormField) {
    if (field.schema instanceof ZodEnum) {
      return (
        <NativeSelect
          key={field.key}
          data={field.schema._def.values}
          label={field.label}
          withAsterisk={field.required}
          {...form.getInputProps(field.key)}
        />
      )
    }

    if (field.schema instanceof ZodString) {
      return (
        <TextInput
          key={field.key}
          label={field.label}
          withAsterisk={field.required}
          {...form.getInputProps(field.key)}
        />
      )
    }

    if (field.schema instanceof ZodNumber) {
      return (
        <NumberInput
          key={field.key}
          label={field.label}
          withAsterisk={field.required}
          {...form.getInputProps(field.key)}
        />
      )
    }

    if (field.schema instanceof ZodBoolean) {
      return (
        <Checkbox
          key={field.key}
          label={field.label}
          {...form.getInputProps(field.key, { type: 'checkbox' })}
        />
      )
    }

    return null
  }

  function renderFields() {
    return props.fields.map(renderField)
  }

  return (
    <form onSubmit={form.onSubmit(props.onSubmit)}>
      <Stack spacing={'xs'}>
        {renderFields()}

        <Group>
          <Button type='submit'>Submit</Button>
          {props.onCancel && (
            <Button onClick={props.onCancel} variant='subtle'>
              Cancel
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  )
}
