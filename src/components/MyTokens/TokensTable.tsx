import { formatDate } from '@/utils/date'
import { ActionIcon, Table, Text } from '@mantine/core'
import { useMemo } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'

type Props = {
  tokens: Record<string, ApiToken>
  onDelete: (id: string) => void
}

export default function TokensTable(props: Props) {
  const lists = useMemo(() => {
    return Object.entries(props.tokens)
  }, [props.tokens])

  function renderRow([id, data]: [string, ApiToken]) {
    return (
      <tr key={id}>
        <td>{data.label}</td>
        <td>{data.token}</td>
        <td>{data.expire ? formatDate(new Date(data.expire)) : 'Never'}</td>
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
          <th>Label</th>
          <th>Key</th>
          <th>Expire</th>
          <th></th>
        </tr>
      </thead>
      {/* body */}
      <tbody>{renderRows()}</tbody>
    </Table>
  )
}
