import { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kakudo Kentaro',
  description: "Kakudo Kentaro's personal website.",
  icons: {
    icon: 'favicon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${inter.variable} ${noto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
