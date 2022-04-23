import { AppProps } from "next/app"
import { SessionProvider as NextAuthProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar"

import { Header } from "../components/Header"

import '../styles/global.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={session}>
      <NextNProgress color="#EBA417" />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
