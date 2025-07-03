import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MusicProvider } from '../contexts/MusicContext'
import MusicPlayerOverlay from '../components/MusicPlayerOverlay'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Austin Creative UK',
  description: 'Personal website of Austin Creative UK - Creative Developer & Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  )
}