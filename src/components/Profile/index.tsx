import { Button, Container, Group, Paper, Stack, Title } from '@mantine/core'
import { signOut } from 'next-auth/react'
import { User } from '../Layout/User'

export default function ProfilePage() {
  return (
    <Container size={'sm'} py='xl' sx={{ flex: 1 }}>
      <Paper p='md'>
        <Title mb='lg' size={'h3'}>
          Profile
        </Title>
        <Stack>
          <User variant='button' />
          <Group>
            <Button
              variant='outline'
              color='red'
              onClick={() => void signOut()}
            >
              Logout
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  )
}
