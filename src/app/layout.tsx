import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { Providers } from '@/lib/providers'

export type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Simple Personal Finance App',
  description: 'Simple app for managing personal finances.',
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
