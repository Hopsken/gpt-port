import React from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  rem,
} from '@mantine/core'
import { useSession } from 'next-auth/react'

export function User() {
  const theme = useMantineTheme()
  const { data } = useSession({ required: true })

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar src={data?.user?.image} radius='xl'>
            {data?.user?.name}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Text size='sm' weight={500}>
              {data?.user?.name}
            </Text>
            <Text color='dimmed' size='xs'>
              {data?.user?.email}
            </Text>
          </Box>

          <HiChevronRight size={rem(18)} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}
