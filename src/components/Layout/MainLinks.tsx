import React from 'react'
import { HiOutlineHome, HiOutlineServerStack } from 'react-icons/hi2'
import { ThemeIcon, UnstyledButton, Group, Text, Overlay } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface MainLinkProps {
  icon: React.ReactNode
  color: string
  label: string
  href: string
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      href={href}
      sx={theme => ({
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
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const data = [
  {
    icon: <HiOutlineHome size='1rem' />,
    color: 'blue',
    label: 'Home',
    href: '/',
  },
  {
    icon: <HiOutlineServerStack size='1rem' />,
    color: 'grape',
    label: 'Admin',
    adminOnly: true,
    href: '/admin',
  },
]

export function MainLinks() {
  const { data: session } = useSession({ required: true })
  const links = data
    .filter(link => !link.adminOnly || session?.user?.role === 'admin')
    .map(link => <MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}
