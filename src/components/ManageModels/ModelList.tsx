import { ActionIcon, Table, Text } from '@mantine/core'
import { useMemo } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'

type Props = {
  models: Record<string, ModelProvider>
  onDelete: (id: string) => void
}

export default function ModelsTable(props: Props) {
  const lists = useMemo(() => {
    return Object.entries(props.models)
  }, [props.models])

  function renderRow([id, data]: [string, ModelProvider]) {
    return (
      <tr key={id}>
        <td>{data.model}</td>
        <td style={{ textTransform: 'capitalize' }}>{data.type}</td>
        <td>
          <ActionIcon onClick={() => props.onDelete(id)}>
            <HiOutlineTrash />
          </ActionIcon>
        </td>
      </tr>
    )
  }

  function renderRows() {
    if (!lists || !lists.length) {
      return (
        <tr>
          <td colSpan={4}>
            <Text color={'dimmed'}>None</Text>
          </td>
        </tr>
      )
    }
    return lists.map(renderRow)
  }

  return (
    <Table fontSize={'xs'}>
      {/* head */}
      <thead>
        <tr>
          <th>Model</th>
          <th>Provider</th>
          <th></th>
        </tr>
      </thead>
      {/* body */}
      <tbody>{renderRows()}</tbody>
    </Table>
  )
}
