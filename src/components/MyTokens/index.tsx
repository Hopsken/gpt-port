import { useDeleteToken, useMyTokens } from '@/hooks/useTokens'
import TokensTable from './TokensTable'
import CreateToken from './CreateToken'
import { openConfirmModal } from '@mantine/modals'
import {
  ActionIcon,
  Box,
  Code,
  Container,
  CopyButton,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { HiOutlineCheck, HiOutlineClipboardDocument } from 'react-icons/hi2'
import { useAPIHost } from './useAPIHost'

export default function MyTokens() {
  const { data } = useMyTokens()
  const deleteTokenMutation = useDeleteToken()
  const apiHost = useAPIHost()

  const handleRevokeKey = (tokenId: string) => {
    openConfirmModal({
      title: 'Revoke Key',
      children:
        "This API key will immediately be disabled. API requests made using this key will be rejected, which could cause any systems still depending on it to break. Once revoked, you'll no longer be able to view or modify this API key.",
      centered: true,
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteTokenMutation.trigger(tokenId)
      },
    })
  }

  return (
    <Container size={'sm'} py='xl' sx={{ flex: 1 }}>
      <Paper p='md'>
        <Stack>
          <Text color='dimmed'>
            {
              'API Key should be used combined with the following API Host, could be used in any OpenAI compatible client with custom API host support.'
            }
          </Text>

          <Group>
            <Text fw='bold'>{'API Host'}</Text>
            <Code>{apiHost}</Code>
            <CopyButton value={apiHost}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow
                  position='right'
                >
                  <ActionIcon
                    color={copied ? 'blue' : 'gray'}
                    onClick={copy}
                    variant='light'
                  >
                    {copied ? (
                      <HiOutlineCheck size='1rem' />
                    ) : (
                      <HiOutlineClipboardDocument size='1rem' />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>

          <TokensTable tokens={data || {}} onDelete={handleRevokeKey} />

          <Box>
            <CreateToken />
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}
