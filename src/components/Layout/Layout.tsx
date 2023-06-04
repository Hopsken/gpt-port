import { AppShell } from '@mantine/core'
import { PropsWithChildren, useState } from 'react'
import AppNavbar from './Navbar'
import AppHeader from './Header'

export default function Layout(props: PropsWithChildren) {
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      padding='md'
      navbar={<AppNavbar opened={opened} />}
      header={
        <AppHeader
          navbarOpened={opened}
          toggleNavbar={() => setOpened(!opened)}
        />
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {props.children}
    </AppShell>
  )
}
