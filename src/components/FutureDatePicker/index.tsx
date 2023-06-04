import { Group, Select, type SelectProps } from '@mantine/core'
import { DateInput, type DateValue } from '@mantine/dates'
import { startOfToday, addDays } from 'date-fns'

export type FuturePreset = '7d' | '30d' | '60d' | '90d'

export type FutureDate =
  | {
      type: 'preset'
      data: FuturePreset
    }
  | {
      type: 'custom'
      data: Date
    }

type Props = {
  value: FutureDate
  onChange: (val: FutureDate) => void
} & Pick<SelectProps, 'withAsterisk' | 'label' | 'description'>

const SelectOptions: SelectProps['data'] = [
  {
    value: '7d',
    label: '7 days',
  },
  {
    value: '30d',
    label: '30 days',
  },
  {
    value: '60d',
    label: '60 days',
  },
  {
    value: '90d',
    label: '90 days',
  },
  {
    value: 'custom',
    label: 'Custom...',
  },
]

export function FutureDatePicker({ value, onChange, ...selectProps }: Props) {
  const selectValue = value.type === 'preset' ? value.data : 'custom'

  const onChangeSelect = (value: string | null) => {
    if (value == null) return
    if (value === 'custom') {
      return onChange({
        type: 'custom',
        data: getFutureDate({ type: 'preset', data: '7d' }),
      })
    }
    return onChange({
      type: 'preset',
      data: value as FuturePreset,
    })
  }

  const onChangeDateValue = (nextVal: DateValue) => {
    if (!nextVal) return
    return onChange({
      type: 'custom',
      data: nextVal,
    })
  }

  return (
    <Group align={'flex-end'}>
      <Select
        data={SelectOptions}
        value={selectValue}
        onChange={onChangeSelect}
        {...selectProps}
      />
      {value.type === 'custom' && (
        <DateInput
          minDate={new Date()}
          valueFormat='MMM D,YYYY'
          value={value.data}
          onChange={onChangeDateValue}
        />
      )}
    </Group>
  )
}

export function getFutureDate(future: FutureDate) {
  const { type, data } = future
  if (type === 'preset') {
    const presetMap: Record<FuturePreset, number> = {
      '7d': 7,
      '30d': 30,
      '60d': 60,
      '90d': 90,
    }
    const today = startOfToday()
    return addDays(today, presetMap[data])
  }

  return data
}
