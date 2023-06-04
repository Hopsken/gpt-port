import { openConfirmModal } from '@mantine/modals'
import { Box, Container, Paper, Stack, Title, rem } from '@mantine/core'
import { useAllModels, useDeleteModel } from '@/hooks/useModels'
import AddModel from './AddModel'
import ModelsTable from './ModelList'

export default function ManageModels() {
  const { data } = useAllModels()
  const deleteModelMutation = useDeleteModel()

  const handleRemoveModel = (modelId: string) => {
    openConfirmModal({
      title: 'Remove Model',
      children:
        'API requests made using this model will be rejected, which could cause any systems still depending on it to break.',
      centered: true,
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteModelMutation.trigger(modelId)
      },
    })
  }

  return (
    <Container size={'sm'} py='xl' sx={{ flex: 1 }}>
      <Paper p='md'>
        <Stack>
          <Title order={3} fw='bold' size={rem(16)}>
            Manage Models
          </Title>
          <ModelsTable models={data || {}} onDelete={handleRemoveModel} />
          <Box>
            <AddModel />
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}
