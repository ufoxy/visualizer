import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

function MyApp({Component, pageProps}: AppProps) {

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
