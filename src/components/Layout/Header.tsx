import { FaGithub } from 'react-icons/fa'
import {
  MediaQuery,
  Burger,
  Header,
  useMantineTheme,
  Title,
  Group,
  Anchor,
  Box,
} from '@mantine/core'

export default function AppHeader(props: {
  navbarOpened: boolean
  toggleNavbar: () => void
}) {
  const theme = useMantineTheme()
  return (
    <Header height={{ base: 50, md: 70 }} p='md'>
      <Group noWrap position='apart' align='center' h='100%'>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger
            opened={props.navbarOpened}
            onClick={props.toggleNavbar}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Box />
        </MediaQuery>

        <Title order={2} size={'h4'}>
          GPTPort
        </Title>

        <Anchor
          href='https://github.com/hopsken/gpt-port'
          target='_blank'
          color='dark'
        >
          <FaGithub size={24} />
        </Anchor>
      </Group>
    </Header>
  )
}
