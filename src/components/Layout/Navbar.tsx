import { Navbar } from '@mantine/core'
import { MainLinks } from './MainLinks'
import { User } from './User'

export default function AppNavbar(props: { opened: boolean }) {
  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!props.opened}
      width={{ sm: 250, lg: 300 }}
    >
      <Navbar.Section grow mt='md'>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User variant='nav' />
      </Navbar.Section>
    </Navbar>
  )
}
