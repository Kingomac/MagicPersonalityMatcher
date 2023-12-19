"use client"

import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import Fonts from './theme/fonts'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <head>
        <title>Magic Personality Matcher</title>
        <meta name="description" content="Determina tu personalidad en base al texto que escribes" />
      </head>
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <Fonts />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
