import type { AppProps, AppType } from 'next/app'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json()),
      }}
    >
      <Head>
        <title>KeyPortal</title>
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
  )
}

export default App
