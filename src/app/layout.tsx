import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Providers } from '@/lib/providers'

import { Inter } from 'next/font/google'
import { ComposedAppBar } from '@/features/components/composedAppBar/ComposedAppBar'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Providers>
          <div className={'main'}>
            <ComposedAppBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
