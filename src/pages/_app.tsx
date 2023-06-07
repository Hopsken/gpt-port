import type { AppProps, AppType } from 'next/app'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ClerkProvider } from '@clerk/nextjs'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ClerkProvider {...pageProps}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then(res => res.json()),
        }}
      >
        <Head>
          <title>GPTPort</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
        </Head>
        <SessionProvider session={session}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <ModalsProvider labels={{ confirm: 'Confirm', cancel: 'Cancel' }}>
              <Component {...pageProps} />
            </ModalsProvider>
          </MantineProvider>
        </SessionProvider>
      </SWRConfig>
    </ClerkProvider>
  )
}

export default App
